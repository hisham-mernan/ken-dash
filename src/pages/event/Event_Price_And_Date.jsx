import React, { useEffect, useState } from "react";

// lib
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

// component
import Form from "../../components/shared/form/Form";
import Button from "../../components/shared/button/Button";
import Form_Actions_Btn from "../../components/shared/button/Form_Actions_Btn";

// service
import { API } from "../../service/apiUrl";
import axiosInstance from "../../service/axiosInstance";

// utils
import { numberPattern, validateEventDateExist } from "../../utils/validator";
import { handleErrors } from "../../utils/handleError";

// hooks
import { formatDateToYYYYMMDD } from "./../../hooks/formateDateToYYYYMMDD";

const Event_Price_And_Date = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    setError,
    setValue,

    formState: { errors, isDirty },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      dates: [
        {
          date: null,
          capacity: null,
          price: null,
          max_purchasable_quantity: null,
        },
      ],
    },
    mode: "onChange",
  });
  // for append
  const prices = watch("dates");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dates",
  });
  const handleAddAnother = () => {
    const lastItem = prices[prices?.length - 1];
    let hasEmptyField = false;

    // check empty
    Object.entries(lastItem).forEach(([key, value]) => {
      if (!lastItem[key]) {
        hasEmptyField = true;
        setError(`dates.${prices.length - 1}.${key}`, {
          type: "manual",
          message: t("required_field"),
        });
      }
    });

    if (!hasEmptyField) {
      append({
        date: null,
        capacity: null,
        price: null,
        max_purchasable_quantity: null,
      });
    }
  };

  const handleRemoveField = (index) => {
    remove(index);
  };

  //________________ function ____________
  const onSubmit = async (data) => {
    if (isDirty) {
      try {
        setLoading(true);

        const sendData = {
          dates: data?.dates?.map((item) => ({
            ...item,
            date: formatDateToYYYYMMDD(item?.date),
          })),
        };

        const response = await axiosInstance.post(
          `${API.events.dates}${id}/`,
          sendData
        );
        const isEdit = response.status === 200 ? true : false;
        const message = isEdit
          ? "sucessfully_create_price_date"
          : "successfully_update_price_date";

        toast.success(t(message));
        navigate(`/event`);
      } catch (err) {
        handleErrors(err, t, setError);
      } finally {
        setLoading(false);
      }
    } else {
      navigate(`/event`);
    }
  };
  const getDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.get(
        `${API.events.event_details}${id}/`
      );
      const data = response.data;

      if (
        Array.isArray(data.available_dates) &&
        data.available_dates.length > 0
      ) {
        const dates = data.available_dates?.map((item) => ({
          date: new Date(item.date),
          capacity: item?.capacity,
          price: item.price,
          max_purchasable_quantity: item.max_purchasable_quantity ?? 10,
        }));

        setValue("dates", dates, { shouldDirty: false });
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
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11">
      <section className="flex flex-col gap-6">
        {fields?.map((item, idx) => {
          const formList = [
            {
              id: 0,
              formType: "label_groups",

              className: "lg:col-span-2 col-span-1 ",
              hasDelete: prices?.length > 1 ? true : false,

              onDelete: () => handleRemoveField(idx),
            },
            {
              id: 1,
              label: `${t("avalible_dates")}`,
              formType: "calendar",
              fieldName: `dates[${idx}].date`,
              name: "from",
              icon: <span>{t("date")}</span>,
              type: "text",
              placeholder: `5-5-${new Date().getFullYear()}`,
              validator: {
                required: "required_field",
                validate: (value) =>
                  validateEventDateExist({ watch, value, idx, setError }),
              },
              showInlineError: true,
              hasRequiredStar: true,
              className: "col-span-1 lg:col-span-2",
            },
            {
              id: 2,
              formType: "input",
              fieldName: `dates[${idx}].capacity`,
              name: "capacity",
              type: "number",
              label: "capacity",
              placeholder: "capacity",
              validator: {
                required: "required_field",
                min: {
                  value: 1,
                  message: `${t("min_number", { length: 1 })} `,
                },
              },
              showInlineError: true,
              hasRequiredStar: true,
              className: "col-span-1 lg:col-span-2",
            },

            {
              id: 3,
              formType: "input",
              fieldName: `dates[${idx}].max_purchasable_quantity`,
              name: "max_number",
              type: "number",
              label: "max_number_of_tickets",
              placeholder: "max_number_of_tickets",
              validator: {
                required: "required_field",
                min: {
                  value: 1,
                  message: `${t("min_number", { length: 1 })} `,
                },
                validate: (value) => {
                  const q = +watch(`dates[${idx}].capacity`);
                  return q >= value || t("max_purchasable_quantity_error");
                },
              },
              hasRequiredStar: true,
              showInlineError: true,
              className: "col-span-1 lg:col-span-2",
            },
            {
              id: 4,
              formType: "input",
              fieldName: `dates[${idx}].price`,
              name: "price",
              type: "text",
              inputMode: "decimal",
              label: "price_per_ticket",
              placeholder: "price_per_ticket",
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
            <fieldset
              key={item?.id}
              className="grid  gap-y-4 gap-x-3  grid-cols-1 lg:grid-cols-2"
            >
              <Form
                key={item.id}
                formList={formList}
                control={control}
                errors={errors}
                setError={setError}
                loading={loading}
                dataLoader={loadingData}
              />
            </fieldset>
          );
        })}
        <Button
          hasFullWidth
          type="dotted"
          textSize="lg"
          onClick={() => handleAddAnother()}
        >
          {t("add_another_dates")}
        </Button>
      </section>
      <Form_Actions_Btn
        backBtnCta={() => {
          navigate(`/event/${id}/details`);
        }}
        mainBtnName="save"
        loading={loading}
      />
    </form>
  );
};

export default Event_Price_And_Date;
