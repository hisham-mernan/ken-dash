import React, { useEffect, useState } from "react";
import Page_Layout from "../../components/layout/Page_Layout";
import Page_Header from "../../components/layout/header/Page_Header";
import usePaginatedData from "../../hooks/usePaginatedData";
import { API } from "../../service/apiUrl";
import Table_Container from "../../components/shared/table/Table_Container";
import { currentLanguageCode } from "../../utils/switchLang";
import { getImageUrl, IMG } from "../../utils/getImageUrl";
import Action from "../../components/shared/table/Action";
import Button from "../../components/shared/button/Button";
import { InputSwitch } from "primereact/inputswitch";
import { ToggleOffIcon, ToggleOnIcon } from "../../assets/images/Image";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleErrors } from "../../utils/handleError";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-toastify";
import { activeFilterList, priceFilterList } from "../../constant/filterList";
import { useAuth } from "../../context/Auth_Context";
import { PackageIcon, SpecialItemsIcon } from "../../assets/icons/Icon";
import Tabs from "../../components/shared/tabs/Tabs";
import { useMediaQuery } from "react-responsive";
const filterList = [
  {
    field: "is_active",
    title: "state",
    data: activeFilterList,
  },
  {
    field: "sort",
    title: "price",
    data: priceFilterList,
  },
];

const Product_List = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [updateLoader, setUpdateLoader] = useState(false);
  const [filter, setFilter] = useState({ type: "special-items" });
  const [searchParam, setSearchParam] = useSearchParams();
  const type = searchParam.get("type");
  const isAdmin = user?.role === "admin";
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const isKen = type
    ? type === "special-items"
    : filter?.type === "special-items";
  const {
    data,
    setData,
    page,
    pages,
    query,
    setQuery,
    loading,
    handlePagination,
    setRefetchData,
  } = usePaginatedData(
    isAdmin && isKen ? API.admin.special_items : API.supplier.product.list
  );
  const pageHeader =
    isAdmin && isKen === "special-items" ? "special_items" : "product";
  const pageTitle =
    isAdmin && isKen === "special-items" ? "special_items_data" : "products";

  //________________________ list _______________________
  const tapList = [
    {
      icon: (
        <SpecialItemsIcon
          width={isMobile ? 24 : 28}
          height={isMobile ? 24 : 28}
        />
      ),
      title: "special_items",
      des: "ken_special_items",
      value: "special-items",
    },
    {
      icon: (
        <PackageIcon width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} />
      ),
      title: "products",
      des: "suppliers_products",
      value: "products",
    },
  ];
  const columns = [
    {
      field: "image",
      header: "product_image",
      body: (item) => (
        <figure className="w-[52px] h-[52px]">
          {item?.image ? (
            <img loading="lazy" decoding="async"
              src={getImageUrl(item?.image, { width: IMG.icon })}
              alt="product img"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="w-full h-full flex bg-gray-50" />
          )}
        </figure>
      ),
    },
    {
      field: "id",
      header: "product_id",
      body: (item) => <span>{`#${item?.id}`}</span>,
    },
    {
      field: "title",
      header: "product_name",
      body: (item) => (
        <p className="line-clamp-1">
          {currentLanguageCode === "en"
            ? item?.title ?? "-"
            : item?.title_ar ?? "-"}
        </p>
      ),
    },
    !(isAdmin && filter?.type === "special-items") && {
      field: "description",
      header: "description",
      body: (item) => (
        <p className="line-clamp-2 max-w-[200px]">
          {currentLanguageCode === "en"
            ? item?.description ?? "-"
            : item?.description_ar ?? "-"}
        </p>
      ),
    },
    {
      field: "supplier_name",
      header: "supplier_name",
      body: (item) => <span>{item?.supplier ?? "-"}</span>,
    },
    {
      field: "hut_name",
      header: "hut_name",
      body: (item) => (
        <p className="line-clamp-1">
          {isAdmin && filter?.type === "special-items"
            ? item?.huts_details
                ?.map(({ title, title_ar }) =>
                  currentLanguageCode === "en" ? title : title_ar
                )
                ?.join(",")
            : currentLanguageCode === "en"
            ? item?.hut?.title
            : item?.hut?.title_ar}
        </p>
      ),
    },
    {
      field: "action",
      header: "",
      body: (item) => (
        <div className="flex items-center gap-2">
          <Action
            viewPath={
              isAdmin && filter?.type === "special-items"
                ? `/admin/special-items/${item?.id}/edit`
                : isAdmin
                ? `/admin/special-items/product/${item?.id}/edit`
                : `/product/${item?.id}/edit`
            }
          />
          <Button
            type="light"
            size="xs"
            className={` min-w-[92px] !p-0 ${
              item?.is_active
                ? "flex-row text-secondary-2 "
                : "flex-row-reverse !text-[#8592A3]"
            }  !font-normal`}
            onClick={() => toggleActive(item?.id, item?.is_active)}
          >
            <img loading="lazy" decoding="async"
              alt="active"
              role="button"
              src={item?.is_active ? ToggleOnIcon : ToggleOffIcon}
              className="w-[18px] h-[18px] object-cover"
            />
            <span>{t(item?.is_active ? "active" : "disabled")}</span>
          </Button>
        </div>
      ),
    },
  ];

  //_____________________ function __________________
  const toggleActive = async (id, is_active) => {
    try {
      setUpdateLoader(true);
      const endpoint = `${
        isAdmin && filter?.type === "special-items"
          ? API.admin.special_items
          : API.supplier.product.list
      }${id}/`;

      const response = await axiosInstance.put(endpoint, {
        is_active: !is_active,
      });
      if (response.status === 200) {
        toast.success(t("successfully_update_product_status"));
        setData((pre) =>
          pre.map((item) =>
            item?.id === id ? { ...item, is_active: !is_active } : item
          )
        );
      }
    } catch (err) {
      console.log(err);
      handleErrors(err, t);
    } finally {
      setUpdateLoader(false);
    }
  };

  //__________________ sideeffect __________________
  useEffect(() => {
    if (type) {
      setFilter({ type });

      const newParam = new URLSearchParams(searchParam);
      newParam.delete("type");
      setSearchParam(newParam);
    }
  }, [type]);

  return (
    <Page_Layout page={pageHeader}>
      {isAdmin && (
        <section className="page main_p">
          <Tabs
            list={tapList}
            variant="flex"
            filter={filter}
            setFilter={setFilter}
            field="type"
            onClick={() => {
              setRefetchData(Date.now());
            }}
          />
        </section>
      )}
      <Page_Header
        title={pageTitle}
        btnName="add_new_product"
        btnCta={() =>
          navigate(
            isAdmin && filter?.type === "special-items"
              ? "/admin/special-items/create"
              : isAdmin
              ? "/admin/special-items/product/create"
              : "/product/create"
          )
        }
      />
      <Table_Container
        searchKey="search"
        emptyText="no_products_yet"
        searchPlaceholder="search_by_product_name_hut"
        page={page}
        query={query}
        pages={pages}
        columns={columns}
        loading={loading}
        setQuery={setQuery}
        filterList={filterList}
        hasPagination={data?.length > 0}
        handlePagination={handlePagination}
        data={data}
      />
    </Page_Layout>
  );
};

export default Product_List;
