import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../components/shared/form/Form";
import Form_Actions_Btn from "../../../components/shared/button/Form_Actions_Btn";
import { activeStatusList, hutSize } from "../../../constant/list";
import { handleErrors } from "../../../utils/handleError";
import axiosInstance from "../../../service/axiosInstance";
import { API } from "../../../service/apiUrl";
import { toast } from "react-toastify";

const Hut_About = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const isEdit = id ? true : false;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
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
      is_active: true,
      size: null,
      main_image: null,
      images: null,
      bedrooms_num: null,
      bathrooms_num: null,
      max_persons_num: null,
      max_kids_num: null,
      location: null,
      address: null,
      address_ar: null,
      check_in: null,
      check_out: null,
    },
    mode: "onChange",
  });

  //__________________ list ________
  const formList = [
    {
      id: 1,
      formType: "input",
      fieldName: "title",
      name: "hut_title",
      type: "text",
      label: "hut_title",
      placeholder: "hut_title",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: 2,
      formType: "input",
      fieldName: "title_ar",
      name: "hut_title_ar",
      type: "text",
      label: "hut_title_ar",
      placeholder: "hut_title_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: 3,
      formType: "textarea",
      fieldName: "description",
      name: "hut_description",
      type: "text",
      label: "hut_description",
      placeholder: "hut_description",
      validator: {
        required: "required_field",
      },
      className: "col-span-1 lg:col-span-2 mb-4",
      hasRequiredStar: true,
    },
    {
      id: 3,
      formType: "textarea",
      fieldName: "description_ar",
      name: "hut_description_ar",
      label: "hut_description_ar",
      placeholder: "hut_description_ar",
      validator: {
        required: "required_field",
      },
      className: "col-span-1 lg:col-span-2 mb-4",
      hasRequiredStar: true,
    },
    {
      id: 4,
      formType: "dropdown",
      fieldName: "is_active",
      placeholder: "status",
      label: "hut_status",
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
      id: 8,

      formType: "label_groups",
      label: "check_in_time",
      hasRequiredStar: true,
      className: "lg:col-span-2 col-span-1 ",
    },
    {
      id: 9,
      formType: "input",
      fieldName: "check_in",
      name: "start_time",
      type: "time",
      icon: <span>{t("start_time")}</span>,
      placeholder: "0",
      validator: {
        required: "required_field",
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: 10,
      formType: "input",
      fieldName: "check_out",
      name: "end_time",
      type: "time",
      icon: <span>{t("end_time")}</span>,
      placeholder: "0",
      validator: {
        required: "required_field",
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: 4,
      formType: "dropdown",
      fieldName: "size",

      label: "hut_size",
      placeholder: "hut_size",
      validator: {
        required: "required_field",
      },

      optionList: hutSize?.map((item) => ({
        name: t(item?.name),
        value: item?.value,
      })),

      className: "lg:col-span-2 col-span-1 mb-4",
      hasRequiredStar: true,
    },
    {
      id: 5,
      formType: "input",
      fieldName: "bedrooms_num",
      name: "bedrooms",
      type: "number",
      icon: <span>{t("bedrooms")}</span>,
      placeholder: "0",
      validator: {
        required: "required_field",
        min: {
          value: 1,
          message: `${t("min_number", { length: 1 })} `,
        },
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: 6,
      formType: "input",
      fieldName: "bathrooms_num",
      name: "bathrooms",
      type: "number",
      icon: <span>{t("bathrooms")}</span>,
      placeholder: "0",
      validator: {
        required: "required_field",
        min: {
          value: 1,
          message: `${t("min_number", { length: 1 })} `,
        },
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: 7,
      formType: "label_groups",
      label: "people_amount",
      hasRequiredStar: true,
      className: "lg:col-span-2 col-span-1 ",
    },
    {
      id: 8,
      formType: "input",
      fieldName: "max_persons_num",
      name: "max_persons_num",
      type: "number",
      icon: <span>{t("adults")}</span>,
      placeholder: "0",
      validator: {
        required: "required_field",
        min: {
          value: 1,
          message: `${t("min_number", { length: 1 })} `,
        },
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: 9,
      formType: "input",
      fieldName: "max_kids_num",
      name: "max_kids_num",
      type: "number",
      icon: <span>{t("children")}</span>,
      placeholder: "0",
      validator: {
        required: "required_field",
        min: {
          value: 1,
          message: `${t("min_number", { length: 1 })} `,
        },
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: 10,
      formType: "map",
      label: "location_on_map",
      fieldName: "location",
      validator: {
        required: "required_field",
      },
      placeholder: "select_your_address",
      className: "lg:col-span-2 col-span-1 mb-4",
    },
    {
      id: 11,
      formType: "input",
      fieldName: "address",
      name: "location_description",
      type: "text",
      label: "location_description",
      placeholder: "location_description",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: 12,
      formType: "input",
      fieldName: "address_ar",
      name: "location_description_ar",
      type: "text",
      label: "location_description_ar",
      placeholder: "location_description_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
      className: "mb-4",
    },
    {
      id: "image",
      fieldName: "main_image",
      formType: "upload",
      label: "hut_cover_image",
      hasRequiredStar: true,
      isEdit: isEdit,
      imageTitle: "upload_image_here",
      validator: {
        required: "required_field",
      },
    },
    {
      id: "images",
      fieldName: "images",
      formType: "upload",
      label: "hut_images",
      hasRequiredStar: true,
      isMultiple: true,
      isEdit: isEdit,
      imageTitle: "upload_hut_images_here",
      validator: {
        required: "required_field",
      },
    },
  ];

  //__________________function ___________
  const onSubmit = async (data) => {
    if (isDirty || !isEdit) {
      try {
        setLoading(true);
        const endpoint = isEdit
          ? `${API.admin.hut.update}${id}/`
          : API.admin.hut.create;
        const method = isEdit ? "put" : "post";
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === "main_image") {
            if (value instanceof File) {
              formData.append(key, value);
            }
          } else if (key === "images") {
            value?.map((item) => {
              if (item.image instanceof File) {
                formData.append(key, item?.image);
              }
            });
          } else if (key === "location") {
            if (
              Array.isArray(value) &&
              value.length === 2 &&
              value[0] &&
              value[1]
            ) {
              formData.append("location.latitude", value[0]);
              formData.append("location.longitude", value[1]);
            }
          } else if (key === "address") {
            formData.append("location.address", value);
          } else if (key === "address_ar") {
            formData.append("location.address_ar", value);
          } else {
            formData.append(key, value);
          }
        });
        // for (const [key, value] of formData.entries()) {
        //   console.log(`${key}:`, value);
        // }

        const response = await axiosInstance[method](endpoint, formData);

        const message = isEdit
          ? "successfully_update_about_hut"
          : "successfully_create_about_hut";
        toast.success(t(message));
        if (response.status === 200 || response.status === 201) {
          navigate(`/admin/huts/${response.data.id}/details`);
        }
      } catch (err) {
        console.log(err, "error");
        handleErrors(err, t, setError);
      } finally {
        setLoading(false);
      }
    } else {
      navigate(`/admin/huts/${id}/details`);
    }
  };
  const getDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.get(`${API.admin.hut.hut}${id}/`);
      const data = response.data;

      if (data.location) {
        const { latitude, longitude, address, address_ar } = data.location;
        if (latitude && longitude) {
          setValue("location", [latitude, longitude], { shouldDirty: false });
        }
        if (address) setValue("address", address, { shouldDirty: false });
        if (address_ar)
          setValue("address_ar", address_ar, { shouldDirty: false });
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "location") {
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
        />
      </fieldset>
      <Form_Actions_Btn mainBtnName="next" loading={loading} />
    </form>
  );
};

export default Hut_About;
