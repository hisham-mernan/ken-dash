import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Form_Actions_Btn from "../../components/shared/button/Form_Actions_Btn";
import Form from "../../components/shared/form/Form";
import { API } from "../../service/apiUrl";
import axiosInstance from "../../service/axiosInstance";
import { handleErrors } from "../../utils/handleError";
import { hasNewFile } from "../../utils/hasNewFile";
import useGetData from "../../hooks/useGetData";
import { currentLanguageCode } from "../../utils/switchLang";
import { toast } from "react-toastify";
import { activeStatusList } from "../../constant/list";

const About_Event = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const isEdit = id ? true : false;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // ______________ hooks ______________
  const { data: hutList } = useGetData(API.list.huts);

  // ___________ useform _________
  const {
    control,
    setError,
    watch,
    setValue,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      title_ar: "",
      description: "",
      description_ar: "",
      image: null,
      hut_id: null,
      is_active: true,
      // max_persons_num: null,
      // max_kids_num: null,
    },
    mode: "onChange",
  });

  //__________________ list ________
  const formList = [
    {
      id: 1,
      formType: "input",
      fieldName: "title",
      name: "event_name",
      type: "text",
      label: "event_name",
      placeholder: "event_name",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
      className: "col-span-1 lg:col-span-2 mb-4",
    },
    {
      id: 2,
      formType: "input",
      fieldName: "title_ar",
      name: "event_name_ar",
      type: "text",
      label: "event_name_ar",
      placeholder: "event_name_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
      className: "col-span-1 lg:col-span-2 mb-4",
    },
    {
      id: 3,
      formType: "input",
      fieldName: "description",
      name: "event_description",
      type: "text",
      label: "event_description",
      placeholder: "description",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      className: "col-span-1 lg:col-span-2 mb-4",
      hasRequiredStar: true,
    },
    {
      id: 4,
      formType: "input",
      fieldName: "description_ar",
      name: "event_description_ar",
      label: "event_description_ar",
      placeholder: "description",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      className: "col-span-1 lg:col-span-2 mb-4",
      hasRequiredStar: true,
    },
    {
      id: 5,
      formType: "dropdown",
      fieldName: "is_active",
      placeholder: "status",
      label: "event_status",
      validator: {
        validate: (v) => {
          return v !== undefined && v !== null ? true : "required_field";
        },
      },
      optionList: activeStatusList?.map((item) => ({
        name: t(item?.name),
        value: item?.value,
      })),
      className: "lg:col-span-2 col-span-1 mb-4",
    },
    {
      id: 6,
      formType: "dropdown",
      fieldName: "hut_id",
      label: "hut_name",
      placeholder: "select_hut_name",
      validator: {
        required: "required_field",
      },
      className: "col-span-1 lg:col-span-2 mb-4",
      optionList: hutList?.map((item) => ({
        name: currentLanguageCode === "en" ? item?.title : item?.title_ar,
        value: item?.id,
      })),
      hasFilter: true,
    },
    // {
    //   id: 7,
    //   formType: "label_groups",
    //   label: "people_amount",
    //   hasRequiredStar: true,
    //   className: "lg:col-span-2 col-span-1 ",
    // },
    // {
    //   id: 8,
    //   formType: "input",
    //   fieldName: "max_persons_num",
    //   name: "max_persons_num",
    //   type: "number",
    //   icon: <span>{t("adults")}</span>,
    //   placeholder: "0",
    //   validator: {
    //     required: "required_field",
    //     min: {
    //       value: 1,
    //       message: `${t("min_number", { length: 1 })} `,
    //     },
    //   },
    //   hasRequiredStar: true,
    //   className: "mb-4",
    // },
    // {
    //   id: 9,
    //   formType: "input",
    //   fieldName: "max_kids_num",
    //   name: "max_kids_num",
    //   type: "number",
    //   icon: <span>{t("children")}</span>,
    //   placeholder: "0",
    //   validator: {
    //     required: "required_field",
    //     min: {
    //       value: 1,
    //       message: `${t("min_number", { length: 1 })} `,
    //     },
    //   },
    //   hasRequiredStar: true,
    //   className: "mb-4",
    // },
    {
      id: "image",
      fieldName: "image",
      formType: "upload",
      label: "image",
      hasRequiredStar: true,
      isEdit: isEdit,
      className: "col-span-1 lg:col-span-2 mb-4",
      imageTitle: "upload_image_here",
      validator: {
        required: "required_field",
      },
    },
  ];
  //__________________function ___________
  const onSubmit = async (data) => {
    // A newly picked image does not reliably flip isDirty, and the else branch
    // navigates away without sending anything -- which looks like a successful
    // save while silently discarding the upload.
    if (isDirty || !isEdit || hasNewFile(data)) {
      try {
        setLoading(true);
        const endpoint = isEdit
          ? `${API.events.about.update}${id}/`
          : API.events.about.add;
        const method = isEdit ? "put" : "post";
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === "image") {
            if (value instanceof File) {
              formData.append(key, value);
            }
          } else {
            formData.append(key, value);
          }
        });
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        const response = await axiosInstance[method](endpoint, formData);

        const message = isEdit
          ? "successfully_update_about_event"
          : "successfully_create_about_event";
        if (response.status === 200 || response.status === 201) {
          navigate(`/event/${response.data.id}/details`);
          toast.success(t(message));
        }
      } catch (err) {
        handleErrors(err, t, setError);
      } finally {
        setLoading(false);
      }
    } else {
      navigate(`/event/${id}/details`);
    }
  };
  const getDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.get(
        `${API.events.event_details}${id}/`
      );
      const data = response.data;

      if (data?.hut) {
        setValue("hut_id", data?.hut.id, { shouldDirty: false });
      }
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "hut") {
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
    if (isEdit) {
      getDetails();
    }
  }, [isEdit]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <fieldset className="grid  gap-y-2 gap-x-6 2xl:gap-x-10 grid-cols-1 lg:grid-cols-2">
        <Form
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
          setError={setError}
          dataLoader={loadingData}
        />
      </fieldset>
      <Form_Actions_Btn mainBtnName="next" loading={loading} />
    </form>
  );
};

export default About_Event;
