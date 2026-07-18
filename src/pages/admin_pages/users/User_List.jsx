import React from "react";

// lib

import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// component
import Tabs from "../../../components/shared/tabs/Tabs";
import Action from "../../../components/shared/table/Action";
import Page_Header from "../../../components/layout/header/Page_Header";
import Table_Container from "../../../components/shared/table/Table_Container";

// service
import { API } from "../../../service/apiUrl";

// hooks
import usePaginatedData from "../../../hooks/usePaginatedData";

// assets
import { HomeIcon, UserFilledIcon } from "../../../assets/icons/Icon";
import Rate from "../../../components/shared/Rate";

const User_List = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const isSupplier = location.pathname.includes("supplier") ? true : false;
  const {
    data,
    handlePagination,
    query,
    setQuery,
    setRefetchData,
    loading,
    page,
    pages,
  } = usePaginatedData(`${API.admin.users.list}`, "pages", {
    role: isSupplier ? "supplier" : "guest",
  });

  const sectionTitle =
    query?.role === "guest"
      ? "clients_data"
      : query?.role === "supplier"
      ? "suppliers_data"
      : "users_data";
  const btnName =
    query?.role === "guest"
      ? "add_new_client"
      : query?.role === "supplier"
      ? "add_new_supllier"
      : "add_new_admin";

  //__________________ list __________
  const filterList = [
    {
      icon: (
        <UserFilledIcon
          width={isMobile ? 30 : 38}
          height={isMobile ? 30 : 38}
        />
      ),
      title: "clients_data",
      des: "client_data_des",
      value: "guest",
    },
    {
      icon: <HomeIcon width={isMobile ? 30 : 38} height={isMobile ? 30 : 38} />,
      title: "users_data",
      des: "users_data_des",
      value: "admin",
    },
  ];
  const columns = [
    { field: "id", header: "id" },
    {
      field: "full_name",
      header: "name",
      body: (item) => <span>{item?.full_name ?? "-"}</span>,
    },
    {
      field: "phone",
      header: "phone_number",
      body: (item) => <span dir="ltr">{item?.phone ?? "-"}</span>,
    },
    { field: "email", header: "email" },
    query?.role === "guest" && {
      field: "client_rating",
      header: "client_rating",
      body: (item) => <Rate />,
    },
    {
      field: "action",
      header: "",
      body: (item) => {
        return (
          <Action
            viewPath={`/admin/${isSupplier ? "supplier" : "users"}/${
              item?.role
            }/${item?.id}/edit`}
            hasDelete={true}
            deleteLink={`${API.admin.users.details}${item?.id}/`}
            refetchFn={() => setRefetchData(Date.now())}
            deleteMessage="user"
          />
        );
      },
    },
  ].filter(Boolean);

  return (
    <section className="grid gap-8">
      {!isSupplier && (
        <section className="page main_p">
          <Tabs
            list={filterList}
            variant="flex"
            filter={query}
            setFilter={setQuery}
            field="role"
          />
        </section>
      )}
      <section className="page main_p main_grid">
        <Page_Header
          title={sectionTitle}
          btnName={btnName}
          btnCta={() => {
            navigate(
              isSupplier
                ? `/admin/supplier/${query?.role}/create`
                : `/admin/users/${query?.role}/create`
            );
          }}
        />{" "}
        <Table_Container
          searchKey="search"
          emptyText="no_users_yet"
          searchPlaceholder="search_by_email"
          page={page}
          query={query}
          pages={pages}
          columns={columns}
          loading={loading}
          setQuery={setQuery}
          // filterList={filterList}
          hasPagination={data?.length > 0}
          handlePagination={handlePagination}
          data={data}
        />
      </section>
    </section>
  );
};

export default User_List;
