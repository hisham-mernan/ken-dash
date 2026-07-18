import React from "react";
import Page_Layout from "../../components/layout/Page_Layout";
import Page_Header from "../../components/layout/header/Page_Header";
import usePaginatedData from "../../hooks/usePaginatedData";
import { API } from "../../service/apiUrl";
import Table_Container from "../../components/shared/table/Table_Container";
import Button from "../../components/shared/button/Button";
import { EmailIcon, SmsTrackingIcon } from "../../assets/icons/Icon";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/Auth_Context";

const Support_List = () => {
  const { t } = useTranslation();

  const { data, loading, page, pages, query, setQuery, handlePagination } =
    usePaginatedData(API.support.support);
  const columns = [
    {
      field: "full_name",
      header: "name",
    },
    { field: "email", header: "email" },
    {
      field: "content",
      header: "message",
      body: (item) => (
        <p className="min-w-[100px] line-clamp-1 break-words break-all whitespace-normal">
          {item?.content ?? "-"}
        </p>
      ),
    },
    {
      field: "action",
      header: "",
      body: (item) => (
        <Button
          type="light"
          size="md"
          iconLeft={<SmsTrackingIcon />}
          className="!font-normal w-fit"
          to={`/support/${item?.id}/reply`}
        >
          {t("send_email")}
        </Button>
      ),
    },
  ];

  return (
    <Page_Layout page="support">
      <Page_Header title="support_data" />{" "}
      <Table_Container
        searchKey="search"
        emptyText="no_support_yet"
        searchPlaceholder="search_by_name"
        page={page}
        query={query}
        pages={pages}
        columns={columns}
        loading={loading}
        setQuery={setQuery}
        hasPagination={data?.length > 0}
        handlePagination={handlePagination}
        data={data}
      />
    </Page_Layout>
  );
};

export default Support_List;
