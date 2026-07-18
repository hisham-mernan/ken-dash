import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EmailIcon } from "../../../assets/icons/Icon";
import Form from "../form/Form";
import axiosInstance from "../../../service/axiosInstance";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../../../service/apiUrl";
import { handleErrors } from "../../../utils/handleError";
import Button from "../button/Button";
import Status_Card from "../modal/Status_Card";

const Refund_Form = ({ onClose, setData }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // ___________ useform _________
  const {
    control,
    setError,
    reset,

    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      reason: "",
    },
    mode: "onChange",
  }); //list
  const formList = [
    {
      id: 1,
      formType: "textarea",
      fieldName: "reason",
      name: "reason",
      type: "reason",
      labelClassName: "text-secondary-dark title_xl font-semibold",
      label: "confirm_refuse_order_cancelation",
      placeholder: "email_message",
      validator: {
        required: "required_field",
      },
      icon: <EmailIcon />,
      hasRequiredStar: true,
    },
  ];
  //_________________ function _____________
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${API.orders.refuseCancellation}${id}/`,
        data
      );
      if (response.status === 200) {
        // onClose();
        // toast.success(t("success_refuse_order_cancelation"));
        reset();
        setData((pre) => ({ ...pre, status: "paid" }));
        setShowSuccess(true);
      }
    } catch (err) {
      handleErrors(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {showSuccess ? (
        <Status_Card
          status="success"
          message="success_refuse_order_cancelation"
          onClose={onClose}
        />
      ) : (
        <>
          <Form
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
            setError={setError}
          />
          <Button
            hasFullWidth
            role="submit"
            loading={loading}
            disabled={loading}
          >
            {" "}
            {t("refuse")}
          </Button>
        </>
      )}
    </form>
  );
};

export default Refund_Form;
