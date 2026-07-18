import React, { useState } from "react";
import Page_Layout from "../../components/layout/Page_Layout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import usePaginatedData from "../../hooks/usePaginatedData";
import { API } from "../../service/apiUrl";
import Page_Header from "../../components/layout/header/Page_Header";
import Badge from "../../components/shared/table/Badge";
import { currentLanguageCode } from "../../utils/switchLang";
import Table_Container from "../../components/shared/table/Table_Container";
import Action from "../../components/shared/table/Action";
import { getUserRole } from "../../utils/auth";
import { handleErrors } from "../../utils/handleError";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-toastify";
import { activeFilterList } from "../../constant/filterList";

const filterList = [
  {
    field: "is_active",
    title: "state",
    data: activeFilterList,
  },
];
const Event_List = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [updateLoader, setUpdateLoader] = useState(false);

  //_________________ hooks ______________
  const {
    data,
    setData,
    handlePagination,
    query,
    setQuery,

    loading,
    page,
    pages,
  } = usePaginatedData(`${API.events.list}`);

  // ____________________ function ______________
  const deleteEvent = async (closeModal, id) => {
    try {
      setUpdateLoader(true);

      const response = await axiosInstance.put(
        `${API.events.event_details}${id}/`,
        {
          is_delete: true,
        }
      );
      if (response.status === 200) {
        closeModal(false);
        toast.success(t("successfully_delete_event"));
        setData((pre) => pre.filter((item) => item?.id === id));
      }
    } catch (err) {
      console.log(err);
      handleErrors(err, t);
    } finally {
      setUpdateLoader(false);
    }
  };
  // ________________ list ____________
  const columns = [
    { field: "id", header: "event_id" },
    {
      field: "event_name",
      header: "event_name",
      body: (item) => (
        <p>{currentLanguageCode === "en" ? item?.title : item?.title_ar}</p>
      ),
    },
    // {
    //   field: "capacity",
    //   header: "capacity",
    //   body: (item) => (
    //     <span>{item?.capacity ? `${item?.capacity} ${t("member")}` : "-"}</span>
    //   ),
    // },
    {
      field: "supplier_name",
      header: "supplier_name",
      body: (item) => <span>{item?.supplier ? item?.supplier : "-"}</span>,
    },
    {
      field: "hut_name",
      header: "hut_name",
      body: (item) => (
        <span>
          {currentLanguageCode === "en"
            ? item?.hut?.title
            : item?.hut?.title_ar}
        </span>
      ),
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
          <Action
            viewPath={`/event/${item?.id}/about`}
            hasDelete={true}
            customDeleteFn={(closeModal) => deleteEvent(closeModal, item?.id)}
            customLoading={updateLoader}
            deleteMessage="event"
          />
        );
      },
    },
  ];
  return (
    <Page_Layout page="events">
      <Page_Header
        title="event_data"
        btnName="add_new_event"
        btnCta={() => {
          navigate(`/event/about`);
        }}
      />{" "}
      <Table_Container
        searchKey="search"
        emptyText="no_events_yet"
        searchPlaceholder="search_by_event_name_hut_supplier"
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

export default Event_List;
