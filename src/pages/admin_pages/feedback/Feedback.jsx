import React from "react";

// lib
import { useTranslation } from "react-i18next";

// components
import Action from "../../../components/shared/table/Action";
import Page_Layout from "../../../components/layout/Page_Layout";
import Page_Header from "../../../components/layout/header/Page_Header";
import Table_Container from "../../../components/shared/table/Table_Container";

// service
import { API } from "../../../service/apiUrl";

// hooks
import usePaginatedData from "../../../hooks/usePaginatedData";

const Feedback = () => {
  const {
    data,
    page,
    pages,
    query,
    setQuery,
    loading,
    handlePagination,
    setRefetchData,
  } = usePaginatedData(API.admin.feedback.list);

  const columns = [
    {
      field: "name",
      header: "name",
      body: (item) => <span>{item?.user?.full_name}</span>,
    },
    {
      field: "email",
      header: "email",
      body: (item) => <span>{item?.user?.email}</span>,
    },
    {
      field: "phone",
      header: "phone_number",
      body: (item) => (
        <span dir="ltr" className="text-black">
          {item?.user?.phone}
        </span>
      ),
    },
    {
      field: "feedback",
      header: "feedback",
      body: (item) => (
        <p className="min-w-[100px] line-clamp-1 break-words break-all whitespace-normal">
          {item?.content}
        </p>
      ),
    },
    {
      field: "action",
      header: "",
      body: (item) => (
        <Action
          hasDelete
          deleteMessage="feedback"
          deleteLink={`${API.admin.feedback.delete}${item?.id}/`}
          refetchFn={() => setRefetchData(Date.now())}
        />
      ),
    },
  ];
  return (
    <Page_Layout page="feedbacks">
      <Page_Header title="feedbacks" />
      <Table_Container
        searchKey="search"
        emptyText="no_feedback_yet"
        searchPlaceholder="search_by_email_full_name"
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

export default Feedback;
