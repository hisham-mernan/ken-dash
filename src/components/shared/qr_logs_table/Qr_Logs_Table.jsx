import React from "react";
import { formatDate } from "../../../hooks/formatDateAndTime";
import { useTranslation } from "react-i18next";
import Page_Header from "../../layout/header/Page_Header";
import Table_Container from "../table/Table_Container";
import usePaginatedData from "../../../hooks/usePaginatedData";
import { API } from "../../../service/apiUrl";

const Qr_Logs_Table = ({ id }) => {
  const { t } = useTranslation();
  //_____________ hooks ______________
  const { data, handlePagination, query, setQuery, loading, page, pages } =
    usePaginatedData(id ? `${API.admin.qr.logs}${id}/` : API.admin.qr.all_logs);
  const columns = [
    { field: "id", header: "qr_id" },
    {
      field: "scanning_time",
      header: "scanning_time",
      body: (item) => (
        <span>{item?.created_at ? formatDate(item?.created_at) : "-"}</span>
      ),
    },
    {
      field: "type",
      header: "type",
      body: (item) => <span>{t(item?.status)}</span>,
    },
  ];
  return (
    <div className="">
      <Table_Container
        title="qr_logs"
        emptyText="no_logs_yet"
        page={page}
        query={query}
        pages={pages}
        columns={columns}
        loading={loading}
        setQuery={setQuery}
        hasFilter={false}
        hasPagination={data?.length > 0}
        handlePagination={handlePagination}
        data={data}
      />
    </div>
  );
};

export default Qr_Logs_Table;
