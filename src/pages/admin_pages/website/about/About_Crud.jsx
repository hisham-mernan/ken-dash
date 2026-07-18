import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { handleErrors } from "../../../../utils/handleError";
import Form from "../../../../components/shared/form/Form";
import Form_Actions_Btn from "../../../../components/shared/button/Form_Actions_Btn";
import axiosInstance from "../../../../service/axiosInstance";
import { API } from "../../../../service/apiUrl";
import { toast } from "react-toastify";
import Website_Header from "../component/Website_Header";

const About_Crud = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const isEdit = location.pathname.includes("edit");
  const navigate = useNavigate();
  const [dataLoader, setDataLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  // ___________ useform _________
  const {
    control,
    setError,
    reset,
    getValues,
    setValue,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      about_us: "",
      about_us_ar: "",
      mission: "",
      mission_ar: "",
      mission_image: null,
      vission: null,
      vission_ar: null,
      vision_image: null,
      main_image: null,
    },
    mode: "onChange",
  });

  const formList = [
    {
      id: 0,
      formType: "label_groups",
      label: "about_us",
      labelClassName: "!font-semibold title_xl text-[#5D5D5D]",
    },
    {
      id: 1,
      formType: "input",
      fieldName: "about_us",
      name: "about_us",
      label: "about_us",
      placeholder: "about_us",
      validator: {
        required: "required_field",
        maxLength: {
          value: 500,
          message: `${t("max_length_error", { length: 500 })} `,
        },
      },
      hasRequiredStar: true,
    },
    {
      id: 2,
      formType: "input",
      fieldName: "about_us_ar",
      name: "about_us_ar",
      label: "about_us_ar",
      placeholder: "about_us_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 500,
          message: `${t("max_length_error", { length: 500 })} `,
        },
      },
      hasRequiredStar: true,
    },
    {
      id: "main_image",
      formType: "upload",
      fieldName: "main_image",
      label: "main_image",
      hasRequiredStar: true,
      isEdit: isEdit,
      imageTitle: "upload_main_image",
      validator: {
        required: "required_field",
      },
    },
    {
      id: 3,
      formType: "label_groups",
      label: "mission",
      labelClassName: "!font-semibold title_xl text-[#5D5D5D]",
    },
    {
      id: 4,
      formType: "input",
      fieldName: "mission",
      name: "mission",
      label: "mission",
      placeholder: "description",
      validator: {
        required: "required_field",
        maxLength: {
          value: 500,
          message: `${t("max_length_error", { length: 500 })} `,
        },
      },
      hasRequiredStar: true,
    },
    {
      id: 5,
      formType: "input",
      fieldName: "mission_ar",
      name: "mission_ar",
      label: "mission_ar",
      placeholder: "description",
      validator: {
        required: "required_field",
        maxLength: {
          value: 500,
          message: `${t("max_length_error", { length: 500 })} `,
        },
      },

      hasRequiredStar: true,
    },
    {
      id: "mission_image",
      formType: "upload",
      fieldName: "mission_image",
      label: "mission_image",
      hasRequiredStar: true,
      isEdit: isEdit,
      imageTitle: "upload_mission_image",
      validator: {
        required: "required_field",
      },
    },
    {
      id: 6,
      formType: "label_groups",
      label: "vission",
      labelClassName: "!font-semibold title_xl text-[#5D5D5D]",
    },
    {
      id: 7,
      formType: "input",
      fieldName: "vission",
      name: "vission",
      label: "vission",
      placeholder: "description",
      validator: {
        required: "required_field",
        maxLength: {
          value: 500,
          message: `${t("max_length_error", { length: 500 })} `,
        },
      },
      hasRequiredStar: true,
    },
    {
      id: 8,
      formType: "input",
      fieldName: "vission_ar",
      name: "vission_ar",
      label: "vission_ar",
      placeholder: "description",
      validator: {
        required: "required_field",
        maxLength: {
          value: 500,
          message: `${t("max_length_error", { length: 500 })} `,
        },
      },
      hasRequiredStar: true,
    },
    {
      id: "vision_image",
      formType: "upload",
      fieldName: "vision_image",
      label: "vision_image",
      hasRequiredStar: true,
      isEdit: isEdit,

      imageTitle: "upload_vision_image",
      validator: {
        required: "required_field",
      },
    },
  ];
  //__________________ function _____________-
  const onSubmit = async (data) => {
    console.log(data, "data");
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "mission_image") {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else if (key === "vision_image") {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else if (key === "main_image") {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else {
          formData.append(key, value);
        }
      });

      const endpoint = isEdit
        ? `${API.admin.website.about.details}`
        : API.admin.website.about.about;
      const method = isEdit ? "patch" : "post";
      const response = await axiosInstance[method](endpoint, formData);
      const message = isEdit
        ? "successfully_update_about"
        : "successfully_create_about";
      if (response.status === 200 || response.status === 201) {
        toast.success(t(message));
        navigate("/admin/website/about/");
      }
    } catch (err) {
      // console.log(err);
      handleErrors(err, t, setError);
    } finally {
      setLoading(false);
    }
  };

  const getDetails = async () => {
    try {
      setDataLoader(true);
      const response = await axiosInstance.get(
        `${API.admin.website.about.details}`
      );
      const data = response.data;
      console.log(data);
      Object.entries(data).map(([key, value]) => {
        setValue(key, value);
      });
    } catch (err) {
      handleErrors(err, t, null);
    } finally {
      setDataLoader(false);
    }
  };
  useEffect(() => {
    if (isEdit) {
      getDetails();
    }
  }, [isEdit]);
  return (
    <section className="flex flex-col gap-6">
      <Website_Header title="about_us" />
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-6">
        <fieldset className="grid grid-cols-1  gap-6 ">
          <Form
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
            setError={setError}
            dataLoader={dataLoader}
          />
        </fieldset>
        <Form_Actions_Btn
          backBtnCta={() => navigate(-1)}
          mainBtnName="save"
          loading={loading}
        />
      </form>
    </section>
  );
};

export default About_Crud;
