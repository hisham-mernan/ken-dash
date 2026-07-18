import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../components/shared/form/Form";
import Button from "../../../components/shared/button/Button";
import { numberPattern, validateDateRange } from "../../../utils/validator";
import Form_Actions_Btn from "../../../components/shared/button/Form_Actions_Btn";
import { handleErrors } from "../../../utils/handleError";
import axiosInstance from "../../../service/axiosInstance";
import { API } from "../../../service/apiUrl";
import { formatDateToYYYYMMDD } from "../../../hooks/formateDateToYYYYMMDD";
import { toast } from "react-toastify";

const Hut_Price = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    setError,
    setValue,
    getValues,
    formState: { errors, isDirty },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      available_dates: [
        {
          date_from: null,
          date_to: null,
        },
      ],
      promocodes: [{ code: null, percentage: null }],
    },
    mode: "onChange",
  });

  // for append
  const dates = watch("available_dates");
  const promoCodes = watch("promocodes");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "available_dates",
  });
  const {
    fields: promoCodeList,
    append: appendPromoCode,
    remove: removePromoCode,
  } = useFieldArray({
    control,
    name: "promocodes",
  });

  const handleAddAnother = (type, currentValue) => {
    const lastItem = currentValue[currentValue?.length - 1];
    let hasEmptyField = false;

    Object.entries(lastItem ?? {}).forEach(([key, value]) => {
      if (!value) {
        hasEmptyField = true;
        setError(`${type}.${dates.length - 1}.${key}`, {
          type: "manual",
          message: t("required_field"),
        });
      }
    });

    if (!hasEmptyField) {
      if (type === "promocodes") {
        appendPromoCode({ code: null, percentage: null });
      } else {
        append({
          date_from: null,
          date_to: null,
          price: null,
        });
      }
    }
  };

  const handleRemoveField = (type, index) => {
    if (type === "promocodes") {
      removePromoCode(index);
      if (promoCodes?.length === 1) {
        appendPromoCode({ code: null, percentage: null });
      }
    } else {
      remove(index);
      if (dates?.length === 1) {
        append({
          date_from: null,
          date_to: null,
        });
      }
    }
  };

  //_____________________ function _________________
  const onSubmit = async (data) => {
    if (isDirty) {
      try {
        setLoading(true);
        const sendData = {
          available_dates: data?.available_dates?.map((item) => ({
            date_from: formatDateToYYYYMMDD(item?.date_from),
            date_to: formatDateToYYYYMMDD(item?.date_to),
            price: item?.price,
          })),
          promocodes:
            data?.promocodes?.length === 1
              ? !data?.promocodes?.[0]?.code &&
                !data?.promocodes?.[0]?.percentage
                ? []
                : data?.promocodes
              : data?.promocodes,
        };

        const response = await axiosInstance.post(
          `${API.admin.hut.prices}${id}/`,
          sendData
        );
        const message =
          response.status === 200
            ? "successfully_update_prices"
            : "sucessfully_create_prices";

        if (response.status === 200 || response.status === 201) {
          navigate("/admin/huts");
        }
        toast.success(t(message));
      } catch (err) {
        console.log(err);
        handleErrors(err, t, setError);
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/admin/huts");
    }
  };
  const getDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.get(`${API.admin.hut.hut}${id}/`);
      const data = response.data;

      if (data?.available_dates?.length > 0) {
        const dates = data.available_dates.map((item) => ({
          date_from: new Date(item.date_from),
          date_to: new Date(item.date_to),
          price: item.price,
        }));

        setValue("available_dates", dates, { shouldDirty: false });
        if (data?.promocode?.length > 0) {
          setValue("promocodes", data?.promocode, { shouldDirty: false });
        }
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "available_dates") {
          setValue(key, value, { shouldDirty: false });
        }
      });
    } catch (err) {
      handleErrors(err, t, setError);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  const pricesFormList = [
    {
      id: 3,
      formType: "input",
      fieldName: `regular_night_price`,
      name: "regular_night_price",
      type: "text",
      inputMode: "decimal",
      label: "regular_night_price",
      placeholder: "regular_night_price",
      validator: {
        required: "required_field",
        pattern: {
          value: numberPattern,
          message: "must_be_max_10_digits_and_optional_2_decimals",
        },
        min: {
          value: 1,
          message: `${t("min_price_is")}: 1 ${t("sar")} `,
        },
      },
      hasRequiredStar: true,
      showInlineError: true,

      className: "col-span-1 lg:col-span-2",
      onKeyDown: (e) => {
        const allowedKeys = [
          "Backspace",
          "Tab",
          "ArrowLeft",
          "ArrowRight",
          "Delete",
          "Home",
          "End",
          ".",
        ];

        if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
          e.preventDefault();
        }

        if (e.key === "." && e.currentTarget.value.includes(".")) {
          e.preventDefault();
        }
      },
    },
    {
      id: 4,
      formType: "input",
      fieldName: `weekend_night_price`,
      name: "weekend_night_price",
      type: "text",
      inputMode: "decimal",
      label: "weekend_night_price",
      placeholder: "weekend_night_price",
      validator: {
        required: "required_field",
        pattern: {
          value: numberPattern,
          message: "must_be_max_10_digits_and_optional_2_decimals",
        },
        min: {
          value: 1,
          message: `${t("min_price_is")}: 1 ${t("sar")} `,
        },
      },
      hasRequiredStar: true,
      showInlineError: true,

      className: "col-span-1 lg:col-span-2",
      onKeyDown: (e) => {
        const allowedKeys = [
          "Backspace",
          "Tab",
          "ArrowLeft",
          "ArrowRight",
          "Delete",
          "Home",
          "End",
          ".",
        ];

        if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
          e.preventDefault();
        }

        if (e.key === "." && e.currentTarget.value.includes(".")) {
          e.preventDefault();
        }
      },
    },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11">
      <section className="flex flex-col gap-6">
        <h2 className="text-[#5D5D5D] font-semibold title_xl ">
          {t("prices")}
        </h2>
        <Form
          formList={pricesFormList}
          control={control}
          errors={errors}
          setError={setError}
          loading={loading || loadingData}
        />
      </section>

      {/* date_availability */}
      <section className="flex flex-col gap-6">
        <h2 className="text-[#5D5D5D] font-semibold title_xl ">
          {t("date_availability")}
        </h2>
        {fields?.map((item, idx) => {
          const formList = [
            {
              id: 0,
              formType: "label_groups",
              label: `${t("avalible_dates")} ${idx + 1}`,
              hasRequiredStar: true,
              className: "lg:col-span-2 col-span-1 ",
              hasDelete: dates?.length > 1 ? true : false,

              onDelete: () => handleRemoveField(idx),
            },
            {
              id: 1,
              formType: "calendar",
              fieldName: `available_dates[${idx}].date_from`,
              name: "from",
              icon: <span>{t("start_date")}</span>,
              type: "text",
              placeholder: `5-5-${new Date().getFullYear()}`,
              validator: {
                required: "required_field",
              },
              showInlineError: true,
              hasRequiredStar: true,
            },
            {
              id: 2,
              formType: "calendar",
              fieldName: `available_dates[${idx}].date_to`,
              name: "from",
              icon: <span>{t("end_date")}</span>,
              type: "text",
              placeholder: `5-5-${new Date().getFullYear()}`,
              validator: {
                required: "required_field",
                validate: (value) =>
                  validateDateRange({ watch, value, idx, setError }),
              },
              showInlineError: true,
              hasRequiredStar: true,
            },
          ];
          return (
            <fieldset
              key={item.id}
              className="grid  gap-y-4 gap-x-3  grid-cols-1 lg:grid-cols-2"
            >
              <Form
                key={item.id}
                formList={formList}
                control={control}
                errors={errors}
                setError={setError}
                loading={loading || loadingData}
              />
            </fieldset>
          );
        })}
        <Button
          hasFullWidth
          type="dotted"
          textSize="lg"
          onClick={() => handleAddAnother("available_dates", dates)}
        >
          {t("add_another_dates")}
        </Button>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-[#5D5D5D] font-semibold title_xl ">
          {t("promo_codes")}
        </h2>
        {promoCodeList?.map((item, idx) => {
          const formList = [
            {
              id: 0,
              formType: "label_groups",
              label: `${t("promo_code")} ${idx + 1}`,
              hasRequiredStar: true,
              className: "lg:col-span-2 col-span-1 ",
              hasDelete: promoCodes?.length > 1 ? true : false,

              onDelete: () => handleRemoveField("promocodes", idx),
            },
            {
              id: 1,
              formType: "input",
              fieldName: `promocodes[${idx}].code`,
              name: "promo_code",
              type: "text",
              label: "promo_code",
              placeholder: "promo_code",
              validator: {
                maxLength: {
                  value: 250,
                  message: `${t("max_length_error", { length: 250 })} `,
                },
              },
              className: "col-span-1 lg:col-span-2",
              showInlineError: true,
            },
            {
              id: 2,
              formType: "input",
              fieldName: `promocodes[${idx}].percentage`,
              name: "promo_code_percentage",
              type: "number",
              label: "promo_code_percentage",
              placeholder: "promo_code_percentage_example",
              validator: {
                validate: (value) => {
                  const promoCode = watch(`promocodes[${idx}].code`);
                  if (promoCode && !value) {
                    return t("required_field");
                  }
                  return true;
                },

                min: {
                  value: 1,
                  message: `${t("min_percentager", { length: 1 })}`,
                },
                max: {
                  value: 100,
                  message: `${t("max_percentage", { length: 100 })}`,
                },
              },
              className: "col-span-1 lg:col-span-2",
              showInlineError: true,
              hasRequiredStar: true,
            },
          ];
          return (
            <fieldset
              key={item.id}
              className="grid  gap-y-4 gap-x-3  grid-cols-1 lg:grid-cols-2"
            >
              <Form
                key={item.id}
                formList={formList}
                control={control}
                errors={errors}
                setError={setError}
                loading={loading || loadingData}
              />
            </fieldset>
          );
        })}
        <Button
          hasFullWidth
          type="dotted"
          textSize="lg"
          onClick={() => handleAddAnother("promocodes", promoCodes)}
        >
          {t("add_another_promo_code")}
        </Button>
      </section>

      <Form_Actions_Btn
        backBtnCta={() => {
          navigate(`/admin/huts/${id}/details`);
        }}
        mainBtnName="save"
        loading={loading}
      />
    </form>
  );
};

export default Hut_Price;
