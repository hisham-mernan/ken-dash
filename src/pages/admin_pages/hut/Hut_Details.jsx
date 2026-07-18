import React, { useEffect, useState } from "react";

// lib
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

// component
import Form from "../../../components/shared/form/Form";
import Button from "../../../components/shared/button/Button";
import Form_Actions_Btn from "../../../components/shared/button/Form_Actions_Btn";
import Includes_Section from "../../../components/shared/includes/Includes_Section";

// service
import { API } from "../../../service/apiUrl";
import axiosInstance from "../../../service/axiosInstance";

// utils
import { handleErrors } from "../../../utils/handleError";

//hooks
import useGetData from "../../../hooks/useGetData";

const Hut_Details = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: iconList } = useGetData(API.list.icons);
  const {
    control,
    setError,
    setValue,
    formState: { errors, isDirty },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      activities: [
        {
          description: "",
          description_ar: "",
        },
      ],
      main_service: [
        {
          icon_id: null,
          description: "",
          description_ar: "",
          is_extra: false,
        },
      ],
      extra_services: [
        {
          icon_id: null,
          description: "",
          description_ar: "",
          is_extra: true,
        },
      ],
    },
    mode: "onChange",
  });

  // _________________ for append ________________
  const activities = watch("activities");
  const mainServices = watch("main_service");
  const extraServices = watch("extra_services");

  const {
    fields: activityList,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: "activities",
  });
  const {
    fields: mainServiceList,
    append: appendMainService,
    remove: removeMainService,
  } = useFieldArray({
    control,
    name: "main_service",
  });
  const {
    fields: extraServiceList,
    append: appendExtraService,
    remove: removeExtraService,
  } = useFieldArray({
    control,
    name: "extra_services",
  });

  const handleAddAnother = (type, currentValue, appendFn, isExtra = null) => {
    const lastItem = currentValue[currentValue?.length - 1];
    let hasEmptyField = false;

    Object.entries(lastItem ?? {}).forEach(([key, value]) => {
      if (!value && value !== false) {
        hasEmptyField = true;
        setError(`${type}.${currentValue.length - 1}.${key}`, {
          type: "manual",
          message: t("required_field"),
        });
      }
    });

    if (!hasEmptyField) {
      if (type === "activities") {
        appendActivity({ description: "", description_ar: "" });
      } else {
        const newItem = {
          icon_id: null,
          description: "",
          description_ar: "",
        };

        if (typeof isExtra === "boolean") {
          newItem.is_extra = isExtra;
        }

        appendFn(newItem);
      }
    }
  };

  const handleRemoveField = (type, index) => {
    if (type === "activities") {
      removeActivity(index);
    } else if (type === "main_service") {
      removeMainService(index);
    } else {
      removeExtraService(index);
    }
  };

  //_________________ submit _________________
  const onSubmit = async (data) => {
    if (isDirty) {
      try {
        setLoading(true);
        const sendData = {
          activities: data?.activities,
          services: [...data.main_service, ...data.extra_services],
        };

        const response = await axiosInstance.post(
          `${API.admin.hut.details}${id}/`,
          sendData
        );

        const message = isEdit
          ? "successfully_update_details"
          : "successfully_create_details";
        console.log(response.status);
        if (response.status === 200 || response.status === 201) {
          navigate(`/admin/huts/${id}/prices`);
          toast.success(t(message));
        }
      } catch (err) {
        handleErrors(err, t, setError);
      } finally {
        setLoading(false);
      }
    } else {
      navigate(`/admin/huts/${id}/prices`);
    }
  };
  const mapServices = (items) =>
    items.map(({ icon, description, description_ar, is_extra }) => ({
      icon_id: icon?.id,
      description,
      description_ar,
      is_extra,
    }));

  const getDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.get(`${API.admin.hut.hut}${id}/`);
      const data = response.data;

      if (data.activities?.length > 0) {
        setIsEdit(true);
        setValue("activities", data.activities);
      }
      if (data.main_services?.length > 0) {
        setValue("main_service", mapServices(data.main_services));
      }

      if (data.extra_services?.length > 0) {
        setValue("extra_services", mapServices(data.extra_services));
      }
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
      {/* start activity */}
      <section className="flex flex-col gap-6">
        <h2 className="text-[#5D5D5D] font-semibold title_xl ">
          {t("activity")}
        </h2>
        <div className="flex flex-col gap-6">
          {activityList?.map((item, idx) => {
            const formList = [
              {
                id: 0,
                formType: "label_groups",

                hasDelete: activities?.length > 1 ? true : false,

                onDelete: () => handleRemoveField("activities", idx),
              },
              {
                id: 1,
                formType: "input",
                label: `${t("activity_description")} ${idx + 1}`,
                fieldName: `activities[${idx}].description`,
                name: "activity_description",

                type: "text",
                placeholder: "activity_description",
                validator: {
                  required: "required_field",
                  maxLength: {
                    value: 250,
                    message: `${t("max_length_error", { length: 250 })} `,
                  },
                },
                showInlineError: true,
                hasRequiredStar: true,
              },
              {
                id: 2,
                formType: "input",
                label: `${t("activity_description_ar")} ${idx + 1}`,
                fieldName: `activities[${idx}][description_ar]`,
                name: "activity_description_ar",

                type: "text",
                placeholder: "activity_description_ar",
                validator: {
                  required: "required_field",
                  maxLength: {
                    value: 250,
                    message: `${t("max_length_error", { length: 250 })} `,
                  },
                },
                showInlineError: true,
                hasRequiredStar: true,
              },
            ];
            return (
              <fieldset className="grid  gap-y-4 gap-x-3  grid-cols-1">
                <Form
                  key={item.id}
                  formList={formList}
                  control={control}
                  errors={errors}
                  setError={setError}
                  loading={loading}
                />
              </fieldset>
            );
          })}
        </div>
        <Button
          hasFullWidth
          type="dotted"
          textSize="lg"
          onClick={() => handleAddAnother("activities", activities)}
        >
          {t("add_another_activity")}
        </Button>
      </section>
      {/* main service */}
      <Includes_Section
        title={t("main_services")}
        label={t("main_services")}
        type="main_service"
        services={mainServices}
        fields={mainServiceList}
        control={control}
        loading={loading}
        errors={errors}
        setError={setError}
        iconList={iconList}
        appendFn={appendMainService}
        handleAddAnother={handleAddAnother}
        removeFn={removeMainService}
      />

      {/* extra service */}
      <Includes_Section
        title={t("extra_services")}
        label={t("extra_services")}
        type="extra_services"
        services={extraServices}
        fields={extraServiceList}
        control={control}
        loading={loading}
        errors={errors}
        setError={setError}
        iconList={iconList}
        appendFn={appendExtraService}
        handleAddAnother={handleAddAnother}
        removeFn={removeMainService}
      />

      <Form_Actions_Btn
        backBtnCta={() => {
          navigate(`/admin/huts/${id}/about`);
        }}
        mainBtnName="next"
        loading={loading}
      />
    </form>
  );
};

export default Hut_Details;
