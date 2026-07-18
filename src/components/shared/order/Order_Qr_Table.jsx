import React from "react";

// lib
import { useTranslation } from "react-i18next";

// component
import Badge from "../table/Badge";
import Button from "../button/Button";
import Table_Container from "../table/Table_Container";
import Page_Header from "../../layout/header/Page_Header";

// hooks
import { formatDate } from "../../../hooks/formatDateAndTime";
import usePaginatedData from "../../../hooks/usePaginatedData";

// service
import { API } from "../../../service/apiUrl";

// assets
import { ArrowLongIcon } from "../../../assets/icons/Icon";

// utils
import { currentLanguageCode } from "../../../utils/switchLang";
import { getOrderBadgeType, getQrStatusBadge } from "../../../utils/badgeList";

// list
import {
  orderStatusFilterList,
  priceFilterList2,
  qrFilterList,
} from "../../../constant/filterList";

const Order_Qr_Table = ({ pageName = "order" }) => {
  const { t } = useTranslation();
  const endpoint =
    pageName === "recent_orders" ? API.orders.latest_order : API.orders.list;
  const table_title =
    pageName === "order" || pageName === "recent_orders"
      ? "latest_order"
      : pageName === "qr"
      ? "qr_code_data"
      : "";
  //_____________ hooks ______________
  const { data, handlePagination, query, setQuery, loading, page, pages } =
    usePaginatedData(
      endpoint,
      pageName === "recent_orders" ? "no_pagination" : "pages"
    );

  //________________ list ___________________
  const columns = [
    { field: "id", header: pageName === "qr" ? "qr_id" : "order_number" },
    {
      field: "hut_title",
      header: "hut_title",
      body: (item) => (
        <p className="line-clamp-1">
          {currentLanguageCode === "en"
            ? item?.hut_title ?? "-"
            : item?.hut_title_ar ?? "-"}
        </p>
      ),
    },
    {
      field: "date",
      header: pageName === "qr" ? "date_and_time" : "date",
      body: (item) => (
        <span>
          {item?.created_at
            ? formatDate(item?.created_at, pageName === "qr" ? "" : "date_only")
            : "-"}
        </span>
      ),
    },
    {
      field: "total_price",
      header: "total_price",
      body: (item) => (
        <p>{item?.total_price ? `${item?.total_price} ${t("sar")}` : "0"}</p>
      ),
    },
    {
      field: "status",
      header: "state",
      body: (item) => {
        const type =
          pageName === "qr"
            ? getQrStatusBadge(item?.is_scaned)
            : getOrderBadgeType(item?.status);
        const text =
          pageName === "qr" ? item?.is_scaned?.toLowerCase() : item?.status;
        return (
          <div>
            <Badge type={type} text={text} />
          </div>
        );
      },
    },
    pageName !== "qr" && {
      field: "extension",
      header: "extension",
      body: (item) => {
        return (
          <div>
            {item?.has_extra_items ? (
              <Badge
                type={item?.has_extra_items ? "warning" : "hold"}
                text={item?.has_extra_items ? "_extension" : "no_extension"}
              />
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      body: (item) => (
        <Button
          size="md"
          type="light"
          iconLeft={
            <span className={currentLanguageCode === "en" ? "" : "rotate-180"}>
              <ArrowLongIcon />
            </span>
          }
          to={
            pageName === "qr"
              ? `/admin/qr/${item?.id}/details`
              : `/orders/${item?.id}/details`
          }
          className="w-fit"
        >
          {t("open")}
        </Button>
      ),
    },
  ];
  const filterList = [
    {
      field: pageName === "qr" ? "is_scaned" : "status",
      title: "state",
      data: pageName === "qr" ? qrFilterList : orderStatusFilterList,
    },
    {
      field: "sort",
      title: "price",
      data: priceFilterList2,
    },
  ];
  return (
    <section
      className={pageName === "recent_orders" ? " " : "page main_p main_grid"}
    >
      {pageName !== "recent_orders" && <Page_Header title={table_title} />}
      <Table_Container
        title={pageName === "recent_orders" ? table_title : null}
        searchKey="search"
        emptyText="no_orders_yet"
        searchPlaceholder="search_by_title"
        page={page}
        query={query}
        pages={pages}
        columns={columns}
        loading={loading}
        setQuery={setQuery}
        hasFilter={pageName === "recent_orders" ? false : true}
        filterList={filterList}
        hasPagination={pageName === "recent_orders" ? false : data?.length > 0}
        handlePagination={handlePagination}
        data={data}
      />
    </section>
  );
};

export default Order_Qr_Table;
