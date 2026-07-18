import React, { useState } from "react";
import Page_Layout from "../../components/layout/Page_Layout";
import Page_Header from "../../components/layout/header/Page_Header";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useGetData from "./../../hooks/useGetData";
import { API } from "../../service/apiUrl";
import { handleErrors } from "../../utils/handleError";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Details from "../../components/shared/details/Details";
import Form from "../../components/shared/form/Form";
import Form_Actions_Btn from "../../components/shared/button/Form_Actions_Btn";
import { EmailIcon } from "../../assets/icons/Icon";

const Support_Reply = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState();

  // ___________ useform _________
  const {
    control,
    setError,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: { support_id: id, email: "" },
    mode: "onChange",
  });
  const { data, loading: dataLoader } = useGetData(
    `${API.support.support}${id}/`
  );
  //___________ list _______________
  const formatDetails = [
    { title: "name", value: data?.full_name ?? "-" },
    { title: "email", value: data?.email ?? "-" },
    {
      title: "message",
      value: data?.content ?? "-",
      valueClassName: "!text-black",
    },
  ];
  const formList = [
    {
      id: 1,
      formType: "textarea",
      fieldName: "email",
      name: "e-mail",
      label: "e-mail",
      placeholder: "write_your_reply",
      validator: {
        required: "required_field",
      },
      textareaClassName: "!h-[290px]",
      hasRequiredStar: true,
      icon: <EmailIcon />,
    },
  ];
  //___________ function _______________
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`${API.support.send}`, data);
      if (response.status === 200) {
        toast.success(t("successfully_send_reply"));
        reset();
      }
    } catch (err) {
      console.log(err);
      handleErrors(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page_Layout page="support">
      <Page_Header title="send_email" />
      <Details list={formatDetails} loading={dataLoader} />{" "}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <fieldset className="">
          <Form
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
            setError={setError}
          />
        </fieldset>
        <Form_Actions_Btn
          backBtnCta={() => navigate(-1)}
          mainBtnName="send_email"
          loading={loading}
        />
      </form>
    </Page_Layout>
  );
};

export default Support_Reply;
