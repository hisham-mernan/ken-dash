import React, { useEffect, useState } from "react";

// lib
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// component
import Form from "../../components/shared/form/Form";
import Page_Layout from "../../components/layout/Page_Layout";
import Page_Header from "../../components/layout/header/Page_Header";
import Form_Actions_Btn from "../../components/shared/button/Form_Actions_Btn";

// hooks
import useGetData from "../../hooks/useGetData";
import { formatDateToYYYYMMDD } from "../../hooks/formateDateToYYYYMMDD";

// services
import { API } from "../../service/apiUrl";
import axiosInstance from "../../service/axiosInstance";

// utils
import { numberPattern } from "../../utils/validator";
import { handleErrors } from "../../utils/handleError";
import { currentLanguageCode } from "../../utils/switchLang";
import { useAuth } from "../../context/Auth_Context";

const Product_Managment = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role !== "supplier";
  const isKenSpecialItemPage =
    isAdmin && !location.pathname.includes("/special-items/product");
  console.log(isKenSpecialItemPage);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const isEdit = location.pathname.includes("edit");
  const pageTitle = isKenSpecialItemPage ? "special_items" : "product";
  // ______________ hooks ________________
  const { data: hutList } = useGetData(API.list.huts);
  // ___________ useform _________
  const {
    control,
    setError,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      title_ar: "",
      description: "",
      description_ar: "",
      image: null,
      price: null,
      capacity: null,
      huts: null,
      min_purchasable_quantity: 1,
      max_purchasable_quantity: 10,
    },
    mode: "onChange",
  });

  // ___________________ list _________________
  const formList = [
    {
      id: 0,
      formType: isKenSpecialItemPage ? "multiselect" : "dropdown",
      fieldName: isKenSpecialItemPage ? "huts" : "hut_id",
      label: "hut_name",
      placeholder: "select_hut_name",
      validator: {
        required: "required_field",
      },

      optionList: hutList?.map((item) => ({
        name: currentLanguageCode === "en" ? item?.title : item?.title_ar,
        value: item?.id,
      })),
      hasFilter: true,
    },
    {
      id: 1,
      formType: "input",
      fieldName: "title",
      name: "product_name",
      type: "text",
      label: "product_name",
      placeholder: "product_name",
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
      fieldName: "title_ar",
      name: "title_ar",
      type: "text",
      label: "product_name_ar",
      placeholder: "product_name_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: `${t("max_length_error", { length: 250 })} `,
        },
      },
      hasRequiredStar: true,
    },

    !isKenSpecialItemPage && {
      id: 3,
      formType: "textarea",
      fieldName: "description",
      name: "product_description",
      label: "product_description",
      placeholder: "product_description",
      validator: {
        required: "required_field",
        maxLength: {
          value: 500,
          message: `${t("max_length_error", { length: 500 })} `,
        },
      },
      hasRequiredStar: true,
    },
    !isKenSpecialItemPage && {
      id: 4,
      formType: "textarea",
      fieldName: "description_ar",
      name: "product_description_ar",
      label: "product_description_ar",
      placeholder: "product_description_ar",
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
      fieldName: "price",
      name: "price",
      type: "text",
      inputMode: "decimal",
      label: "price",
      placeholder: "price",
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
    {
      id: 6,
      formType: "input",
      fieldName: "capacity",
      name: "quantity",
      type: "number",
      inputMode: "decimal",
      label: "quantity",
      placeholder: "quantity",
      validator: {
        required: "required_field",

        min: {
          value: 1,
          message: `${t("min_quantity_is", { value: 1 })} `,
        },
        max: {
          value: 1000000000,
          message: `${t("max_quantity_is", { value: 1 })} `,
        },
      },
      hasRequiredStar: true,
    },
    isKenSpecialItemPage
      ? null
      : {
          id: 7,
          fieldName: "date",
          formType: "calendar",
          label: "date",
          placeholder: `5-5-${new Date().getFullYear()}`,
          hasRequiredStar: true,

          validator: {
            required: "required_field",
          },
        },
    {
      id: 8,
      formType: "input",
      fieldName: "min_purchasable_quantity",
      name: "min_purchasable_quantity",
      type: "number",
      inputMode: "decimal",
      label: "min_purchasable_quantity",
      placeholder: "min_purchasable_quantity",
      validator: {
        min: {
          value: 1,
          message: `${t("min_quantity_is", { value: 1 })} `,
        },
      },
    },
    {
      id: 9,
      formType: "input",
      fieldName: "max_purchasable_quantity",
      name: "max_purchasable_quantity",
      type: "number",
      inputMode: "decimal",
      label: "max_purchasable_quantity",
      placeholder: "max_purchasable_quantity",
      validator: {
        min: {
          value: 1,
          message: t("min_quantity_is", { value: 1 }),
        },
        validate: (value) => {
          const q = watch("capacity");
          return q >= value || t("max_purchasable_quantity_error");
        },
      },
    },
    {
      id: "image",
      fieldName: "image",
      formType: "upload",
      label: "image",
      hasRequiredStar: true,
      isEdit: isEdit,
      imageTitle: "upload_image_here",
      validator: {
        required: "required_field",
      },
    },
  ];
  // ___________________ function _________________
  const getProductDetails = async () => {
    try {
      setLoadingData(true);
      const endpoint = isKenSpecialItemPage
        ? `${API.admin.special_items}${id}/`
        : `${API.supplier.product.list}${id}/`;

      const response = await axiosInstance.get(endpoint);
      if (response.status === 200) {
        const fetchedData = response.data;
        console.log(fetchedData, "sss");
        Object.entries(fetchedData).forEach(([key, value]) => {
          if (key === "huts_details") {
            setValue(
              "huts",
              value?.map(({ id }) => id)
            );
          } else if (key === "hut") {
            setValue("hut_id", value?.id);
          } else if (key === "available_dates" && value) {
            setValue("date", new Date(value?.date));
          } else {
            setValue(key, value);
          }
        });
      }
    } catch (err) {
      // console.log(err);
      handleErrors(err, t, null);
    } finally {
      setLoadingData(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const kenSpecialItemsEndpoint = isEdit
        ? `${API.admin.special_items}${id}/`
        : API.admin.special_items;

      const productEndpoint = isEdit
        ? `${API.supplier.product.list}${id}/`
        : API.supplier.product.list;

      const endpoint = isKenSpecialItemPage
        ? kenSpecialItemsEndpoint
        : productEndpoint;
      console.log(data, isKenSpecialItemPage);

      const method = isEdit ? "put" : "post";
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else if (key === "date" && value) {
          formData.append(key, formatDateToYYYYMMDD(value));
        } else if (key === "huts") {
          value?.forEach((item) => {
            formData.append("huts", item);
          });
        } else {
          formData.append(key, value);
        }
      });
      for (let [key, value] of formData.entries()) {
        console.log(key, value, "test");
      }
      const response = await axiosInstance[method](endpoint, formData);
      const message =
        response.status === 201
          ? "sucessfully_create_product"
          : "successfully_update_product";
      if (response.status === 200 || response.status === 201) {
        if (isKenSpecialItemPage) {
          navigate(`/admin/special-items?type=special-items`);
        } else {
          if (isAdmin) {
            navigate(`/admin/special-items?type=products`);
          } else {
            navigate("/product?type=products");
          }
        }
        toast.success(t(message));
      }
    } catch (err) {
      handleErrors(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isEdit) {
      getProductDetails();
    }
  }, [isEdit]);
  return (
    <Page_Layout page={pageTitle}>
      <Page_Header title="add_new_product" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <fieldset className="grid gap-6 grid-cols-1 ">
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
          backBtnCta={() => {
            if (isKenSpecialItemPage) {
              navigate(`/admin/special-items?type=special-items`);
            } else {
              if (isAdmin) {
                navigate(`/admin/special-items?type=products`);
              } else {
                navigate("/product?type=products");
              }
            }
          }}
          mainBtnName={isEdit ? "save" : "add_new_product"}
          loading={loading}
        />
      </form>
    </Page_Layout>
  );
};

export default Product_Managment;
