import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../../service/apiUrl";
import axiosInstance from "../../../../service/axiosInstance";
import { toast } from "react-toastify";
import { handleErrors } from "../../../../utils/handleError";
import Website_Header from "../component/Website_Header";
import Form from "../../../../components/shared/form/Form";
import Form_Actions_Btn from "../../../../components/shared/button/Form_Actions_Btn";

const Terms_Description_Managment = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(location.pathname.includes("edit"));

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
      title: "",
      title_ar: "",
    },
    mode: "onChange",
  });
  const formList = [
    {
      id: 1,
      formType: "textarea",
      fieldName: "title",
      name: "title",
      label: "title",
      placeholder: "title",
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
      formType: "textarea",
      fieldName: "title_ar",
      name: "title_ar",
      label: "title_ar",
      placeholder: "title_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 500,
          message: `${t("max_length_error", { length: 500 })} `,
        },
      },
      hasRequiredStar: true,
    },
  ];

  //__________________ function _____________-
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const endpoint = isEdit
        ? `${API.admin.website.terms_and_conditions.overview.update}`
        : API.admin.website.terms_and_conditions.overview.main;
      const method = isEdit ? "put" : "post";
      const response = await axiosInstance[method](endpoint, formData);
      const message = isEdit
        ? "successfully_update_overview"
        : "successfully_create_overview";
      if (response.status === 200 || response.status === 201) {
        toast.success(t(message));
        navigate("/admin/website/terms-and-conditions/overview/");
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
        `${API.admin.website.terms_and_conditions.overview.main}`
      );
      const data = response.data;

      if (data?.detail) {
        setIsEdit(false);
      }
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
      <Website_Header title="terms_description" />
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

export default Terms_Description_Managment;
