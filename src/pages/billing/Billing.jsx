import React from "react";
import { useTranslation } from "react-i18next";
import { getStateBadgeType } from "../../utils/badgeList";
import Badge from "../../components/shared/table/Badge";
import Table_Container from "../../components/shared/table/Table_Container";
import usePaginatedData from "../../hooks/usePaginatedData";
import { API } from "../../service/apiUrl";
import Button from "../../components/shared/button/Button";
import { DownloadIcon } from "../../assets/icons/Icon";
import Page_Layout from "../../components/layout/Page_Layout";
import { orderStatusFilterList } from "../../constant/filterList";
import Page_Header from "../../components/layout/header/Page_Header";

const filterList = [
  {
    field: "status",
    title: "state",
    data: orderStatusFilterList,
  },
];
const Billing = () => {
  const { t } = useTranslation();
  const { data, handlePagination, query, setQuery, loading, page, pages } =
    usePaginatedData(API.billing);

  //________________ list _______________
  const columns = [
    {
      field: "id",
      header: "transaction_id",
      body: (item) => <span className=" text-start">#{item?.id}</span>,
    },
    {
      field: "order_id",
      header: "order_id",
      body: (item) => <span className=" text-start">#{item?.order_id}</span>,
    },
    {
      field: "username",
      header: "username",
      body: (item) => <span>{item?.full_name}</span>,
    },
    {
      field: "amount",
      header: "amount",
      body: (item) => <p>{item?.price ? `${item?.price} ${t("sar")}` : "-"}</p>,
    },
    {
      field: "state",
      header: "state",
      body: (item) => (
        <div>
          <Badge type={getStateBadgeType(item?.state)} text={item?.state} />
        </div>
      ),
    },
    {
      field: "action",
      header: "",
      body: (item) => {
        return (
          <Button
            size="md"
            type="light"
            iconLeft={<DownloadIcon />}
            className="w-fit"
          >
            {t("invoice")}
          </Button>
        );
      },
    },
  ];

  return (
    <Page_Layout page="billings">
      <Page_Header title="billings_details" />{" "}
      <Table_Container
        searchKey="search"
        emptyText="no_billing_yet"
        searchPlaceholder="search_by_order_id"
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

export default Billing;
