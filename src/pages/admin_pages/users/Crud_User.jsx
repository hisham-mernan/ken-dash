import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  emailRegex,
  genericNationalIdPattern,
  passwordPattern,
  saudiPhoneNumberRegex,
} from "../../../utils/validator";

import Form from "../../../components/shared/form/Form";
import {
  EmailIcon,
  IdIcon,
  KeyIcon,
  UserIcon3,
  UserSquareIcon,
} from "../../../assets/icons/Icon";

import { handleErrors } from "../../../utils/handleError";
import { API } from "../../../service/apiUrl";
import axiosInstance from "../../../service/axiosInstance";
import { toast } from "react-toastify";

import Page_Header from "../../../components/layout/header/Page_Header";
import Form_Actions_Btn from "../../../components/shared/button/Form_Actions_Btn";

const Crud_User = () => {
  const { t } = useTranslation();
  const { role, id } = useParams();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(false);

  const isEdit = location.pathname.includes("edit") ? true : false;
  const title = isEdit
    ? `${"update"} ${t(role)}`
    : role === "guest"
    ? "add_new_client"
    : role === "supplier"
    ? "add_new_supllier"
    : "add_new_admin";
  const btnTitle = isEdit
    ? t("save")
    : role === "guest"
    ? "add_new_client"
    : role === "supplier"
    ? "add_new_supllier"
    : "add_new_admin";

  const [loading, setLoading] = useState(false);
  const initailData = {
    full_name: "",
    email: null,
    id_num: "",
    phone: null,
    position: null,
    password: null,
    confirm_password: null,
    breif: null,
  };
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
    defaultValues: initailData,
    mode: "onChange",
  });
  const formList = [
    {
      id: 1,
      formType: "input",
      fieldName: "full_name",
      label: "full_name",
      name: "full_name",
      placeholder: "full_name_placeholder",
      validator: {
        required: "required_field",
        maxLength: {
          value: 80,
          message: `${t("max_length_error", { length: 80 })} `,
        },
      },
      icon: <UserIcon3 />,
      hasRequiredStar: true,
      isGrouped: true,
    },
    {
      id: 2,
      formType: "input",
      fieldName: "id_num",
      name: "id_number",
      label: "id_number",
      placeholder: "id_number_placeholder",
      validator: {
        required: "required_field",
        pattern: {
          value: genericNationalIdPattern,
          message: "id_validation",
          maxLength: {
            value: 80,
            message: `${t("max_length_error", { length: 80 })} `,
          },
        },
      },
      icon: <IdIcon />,
      hasRequiredStar: true,
      groupWith: 1,
    },
    {
      id: 3,
      formType: "input",
      fieldName: "email",
      name: "email",
      type: "email",
      label: "email",
      placeholder: "email_placeholder",
      validator: {
        required: "required_field",
        pattern: {
          value: emailRegex,
          message: "invalid_email_format",
          maxLength: {
            value: 155,
            message: `${t("max_length_error", { length: 155 })} `,
          },
        },
      },
      icon: <EmailIcon />,
      hasRequiredStar: true,
      isGrouped: true,
    },
    {
      id: 4,
      formType: "phone_number",
      fieldName: "phone",
      type: "number",
      label: "phone_number",
      placeholder: "phone_number",
      validator: {
        required: "required_field",
        pattern: {
          value: saudiPhoneNumberRegex,
          message: "invalid_phone_number",
        },
      },
      hasRequiredStar: true,
      groupWith: 3,
    },
    role === "supplier" && {
      id: 5,
      formType: "input",
      fieldName: "breif",
      type: "text",
      label: "brief",
      placeholder: "company_brief",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      className: "col-span-1 lg:col-span-2",
      hasRequiredStar: true,
      icon: <UserSquareIcon />,
    },
    role === "admin" && {
      id: 5,
      formType: "input",
      fieldName: "position",
      type: "text",
      label: "position",
      placeholder: "CEO",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      className: "col-span-1 lg:col-span-2",
      hasRequiredStar: true,
      icon: <UserSquareIcon />,
    },
    {
      id: 6,
      formType: "input",
      type: "password",
      fieldName: "password",
      label: "password",
      placeholder: "password",
      validator: {
        ...(isEdit ? {} : { required: "required_field" }),
        pattern: {
          value: passwordPattern,
          message: "wrong_password",
        },
        maxLength: {
          value: 100,
          message: `${t("max_length_error", { length: 100 })} `,
        },
      },
      icon: <KeyIcon />,
      hasRequiredStar: !isEdit,
      className: "col-span-1 lg:col-span-1",
    },
    {
      id: 7,
      formType: "input",
      type: "password",
      fieldName: "confirm_password",
      validator: {
        ...(isEdit ? {} : { required: "required_field" }),
        validate: (value) => {
          const password = getValues("password");
          if (value && !password) {
            setError("password", {
              message: "required_field",
            });
          }
          return value === password || "password_mismatch";
        },
      },
      placeholder: "confirm_password_placeholder",
      label: "confirm_password",
      showForgetPassword: false,
      hasRequiredStar: !isEdit,
      icon: <KeyIcon />,
      className: "col-span-1 lg:col-span-1",
    },
  ];

  //__________________ function ______________
  const getUserDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.get(
        `${API.admin.users.details}${id}/`
      );
      const data = response.data;
      if (response.status === 200) {
        Object.keys(initailData).forEach((key) => {
          if (key !== "password" || key !== "confirm_password") {
            if (key === "phone") {
              setValue(key, data?.[key]?.slice(4));
            } else {
              setValue(key, data?.[key]);
            }
          }
        });
      }
    } catch (err) {
      handleErrors(err, t);
    } finally {
      setLoadingData(false);
    }
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let sendData = {
        ...data,
        phone: `+966${data?.phone}`,
      };

      // if (isEdit) {
      //   sendData = Object.keys(dirtyFields).reduce((acc, key) => {
      //     acc[key] = data[key];
      //     return acc;
      //   }, {});
      // }
      console.log(sendData, "s");

      const endpoint = isEdit
        ? `${API.admin.users.details}${id}/`
        : role === "admin"
        ? API.admin.users.add_admin
        : role === "supplier"
        ? API.admin.users.add_supplier
        : API.admin.users.create;
      const method = isEdit ? "put" : "post";
      const response = await axiosInstance[method](endpoint, sendData);

      const message =
        response.status === 201
          ? role === "admin"
            ? "successfully_create_admin"
            : role === "supplier"
            ? "successfully_create_supplier"
            : "successfully_create_user"
          : role === "admin"
          ? "successfully_update_admin"
          : role === "supplier"
          ? "successfully_update_supplier"
          : "successfully_update_user";
      toast.success(t(message));
      if (response.status === 201 || response.status === 200) {
        reset();
        if (role === "supplier") {
          navigate("/admin/supplier");
        } else {
          navigate("/admin/users");
        }
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
      getUserDetails();
    }
  }, [isEdit]);
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="page main_p flex flex-col gap-6"
      >
        <Page_Header title={title} />
        <fieldset className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Form
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
            setError={setError}
            dataLoader={loadingData}
          />
        </fieldset>
        <Form_Actions_Btn
          backBtnCta={() => navigate("/admin/users")}
          mainBtnName={btnTitle}
          loading={loading}
        />
      </form>
    </section>
  );
};

export default Crud_User;
