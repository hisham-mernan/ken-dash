import React from "react";
import Page_Layout from "../../../components/layout/Page_Layout";
import Page_Header from "../../../components/layout/header/Page_Header";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { currentLanguageCode } from "../../../utils/switchLang";
import Badge from "../../../components/shared/table/Badge";
import Table_Container from "../../../components/shared/table/Table_Container";
import usePaginatedData from "../../../hooks/usePaginatedData";
import { API } from "../../../service/apiUrl";
import Action from "../../../components/shared/table/Action";
import { activeFilterList, hutSizeFilter } from "../../../constant/filterList";

const filterList = [
  {
    field: "is_active",
    title: "state",
    data: activeFilterList,
  },
  {
    field: "size",
    title: "size",
    data: hutSizeFilter,
  },
];
const Hut_List = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //_________________ hooks ______________
  const {
    data,
    handlePagination,
    query,
    setQuery,
    setRefetchData,
    loading,
    page,
    pages,
  } = usePaginatedData(`${API.admin.hut.list}`);
  // ________________ list ____________
  const columns = [
    { field: "id", header: "hut_id" },
    {
      field: "hut_name",
      header: "hut_name",
      body: (item) => (
        <p>{currentLanguageCode === "en" ? item?.title : item?.title_ar}</p>
      ),
    },
    {
      field: "hut_size",
      header: "hut_size",
      body: (item) => <span>{t(item?.size)}</span>,
    },
    {
      field: "status",
      header: "state",
      body: (item) => (
        <Badge
          type={item?.is_active ? "success" : "disabled"}
          text={item?.is_active ? "active" : "disabled"}
        />
      ),
    },
    {
      field: "action",
      header: "",
      body: (item) => {
        return (
          <div className="flex justify-center">
            <Action
              viewPath={`/admin/huts/${item?.id}/about`}
              hasDelete={true}
              deleteLink={`${API.admin.hut.hut}${item?.id}/`}
              refetchFn={() => setRefetchData(Date.now())}
              deleteMessage="event"
            />
          </div>
        );
      },
    },
  ];
  return (
    <Page_Layout page="huts">
      <Page_Header
        title="hut_data"
        btnName="add_new_hut"
        btnCta={() => {
          navigate(`/admin/huts/about`);
        }}
      />
      <Table_Container
        searchKey="search"
        emptyText="no_huts_yet"
        searchPlaceholder="search_by_title"
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

export default Hut_List;
