import React, { useEffect, useState } from "react";
import { API } from "../../../../service/apiUrl";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../../service/axiosInstance";
import { handleErrors } from "../../../../utils/handleError";
import { toast } from "react-toastify";
import Website_Header from "../component/Website_Header";
import Form from "../../../../components/shared/form/Form";
import Form_Actions_Btn from "../../../../components/shared/button/Form_Actions_Btn";
import { useContent } from "../../../../hooks/useContent";

const faqInitialList = {
  answer: "",
  answer_ar: "",
  question: null,
  question_ar: null,
};
const defaultInitialList = {
  title: "",
  title_ar: "",
  description: "",
  description_ar: "",
};
const Content_Management_Crud = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const isEdit = location.pathname.includes("edit");
  const isFaq = location.pathname.includes("faq");
  const initialValue = isFaq ? faqInitialList : defaultInitialList;
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
    defaultValues: initialValue,
    mode: "onChange",
  });

  //____________________ hooks __________________

  const {
    title,
    endpoint,
    update,
    add,
    hasTitle,
    hasDes,
    hasImage,
    route,
    message_create,
    message_update,
  } = useContent("details", isEdit, setValue);
  const navigate = useNavigate();
  const [dataLoader, setDataLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  // __________________ list __________________
  const defaultList = [
    hasTitle && {
      id: 1,
      formType: "input",
      fieldName: "title",
      name: "title",
      label: "title",
      placeholder: "title",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
    },
    hasTitle && {
      id: 2,
      formType: "input",
      fieldName: "title_ar",
      name: "title_ar",
      label: "title_ar",
      placeholder: "title_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
    },
    hasDes && {
      id: 3,
      formType: title === "terms_and_conditions" ? "editor" : "textarea",
      fieldName: "description",
      name: "description",
      label: "description",
      placeholder: "description",
      validator: {
        required: "required_field",
        maxLength: {
          value: title === "terms_and_conditions" ? 500000 : 1000,
          message: `${t("max_length_error", {
            length: title === "terms_and_conditions" ? 500000 : 1000,
          })} `,
        },
      },
      hasRequiredStar: true,
    },
    hasDes && {
      id: 4,
      formType: title === "terms_and_conditions" ? "editor" : "textarea",
      fieldName: "description_ar",
      name: "description_ar",
      label: "description_ar",
      placeholder: "description",
      validator: {
        required: "required_field",
        maxLength: {
          value: title === "terms_and_conditions" ? 500000 : 1000,
          message: `${t("max_length_error", {
            length: title === "terms_and_conditions" ? 500000 : 1000,
          })} `,
        },
      },
      hasRequiredStar: true,
    },
    hasImage && {
      id: "image",
      formType: "upload",
      fieldName: "image",
      label: "image",
      hasRequiredStar: true,
      isEdit: isEdit,
      imageTitle: "upload_image",
      validator: {
        required: "required_field",
      },
    },
  ];
  const faqList = [
    {
      id: 1,
      formType: "input",
      fieldName: "question",
      name: "question",
      label: "question",
      placeholder: "question",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
    },
    {
      id: 2,
      formType: "input",
      fieldName: "question_ar",
      name: "question_ar",
      label: "question_ar",
      placeholder: "question_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
    },
    {
      id: 3,
      formType: "input",
      fieldName: "answer",
      name: "answer",
      label: "answer",
      placeholder: "answer",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
    },
    {
      id: 4,
      formType: "input",
      fieldName: "answer_ar",
      name: "answer_ar",
      label: "answer_ar",
      placeholder: "description",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
    },
  ];
  const formList = title === "faq" ? faqList : defaultList;
  //_______________ function _____________
  const getDetails = async () => {
    try {
      setDataLoader(true);
      const response = await axiosInstance.get(`${endpoint}${id}/`);
      const fetchedData = response.data;
      Object.entries(fetchedData).forEach(([key, value]) => {
        setValue(key, value);
      });
    } catch (err) {
      handleErrors(err, t, setError);
    } finally {
      setDataLoader(false);
    }
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const method = isEdit ? "put" : "post";
      const submitEndpoint = isEdit ? `${update}${id}/` : `${add}`;

      const formData = new FormData();
      Object.entries(data).map(([key, value]) => {
        if (hasImage && key === "image") {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else {
          formData.append(key, value);
        }
      });
      const response = await axiosInstance[method](submitEndpoint, formData);
      const message = response.status === 200 ? message_create : message_update;
      if (response.status === 201 || response.status === 200) {
        toast.success(t(message));
        reset();
        navigate(route);
      }
    } catch (err) {
      console.log(err);
      handleErrors(err, t, setError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getDetails();
    }
  }, []);
  return (
    <section className="flex flex-col gap-6">
      <Website_Header title={title} />
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

export default Content_Management_Crud;
