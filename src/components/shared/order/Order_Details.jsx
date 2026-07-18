import React, { useEffect, useState } from "react";
import { API } from "../../../service/apiUrl";
import useGetData from "../../../hooks/useGetData";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import Page_Layout from "../../layout/Page_Layout";
import Page_Header from "../../layout/header/Page_Header";
import { CheckIcon } from "../../../assets/icons/Icon";
import Badge from "../table/Badge";
import Details from "../details/Details";

import Page_Nout_Found from "../../../pages/404/Page_Nout_Found";
import { useMediaQuery } from "react-responsive";
import Table_Container from "../table/Table_Container";
import { getOrderBadgeType } from "../../../utils/badgeList";
import { formatDate } from "../../../hooks/formatDateAndTime";
import Form_Actions_Btn from "../button/Form_Actions_Btn";
import Confirmation_Modal from "../modal/Confirmation_Modal";
import { handleErrors } from "../../../utils/handleError";
import axiosInstance from "../../../service/axiosInstance";
import { toast } from "react-toastify";
import Modal from "../modal/Modal";
import Refund_Form from "./Refund_Form";
import Qr_Logs_Table from "../qr_logs_table/Qr_Logs_Table";
import { getUserRole } from "../../../utils/auth";
import { currentLanguageCode } from "../../../utils/switchLang";
import Rate from "../Rate";

const role = getUserRole();
const Order_Details = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [searchParam] = useSearchParams("");
  const isCommingFromScan = searchParam.get("scan") === "true" ? true : false;
  const isComingFromQr = location.pathname.includes("qr");
  const endpoint = `${API.orders.details}${id}/`;
  const { data, setData, loading, error } = useGetData(endpoint);
  const pageTitle = isComingFromQr ? "qr" : "orders";
  const sectionTitle = isComingFromQr ? "qr_order_details" : "order_details";

  const isTablet = useMediaQuery({ maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 600 });

  // modal
  //refund
  const [refundToggleModal, setRefundToggleModal] = useState(false);
  // refuse cancelation
  const [visible, setVisible] = useState(false);
  const [loadingCancelation, setLoadingCancelation] = useState(false);
  console.log(data);
  // _______________ list _______________
  const list = [
    {
      title: "hut_details",
      value: <Badge type="disabled" text={data?.hut_title ?? "-"} />,
    },
    {
      title: "date",
      value: (
        <Badge
          type="disabled"
          content={
            <div className="flex items-center flex-wrap  gap-3 md:gap-6">
              <p className="flex items-center gap-1">
                <strong>{t("from")}</strong>
                <span>{data?.date?.date_from} </span>
              </p>
              <p className="flex items-center gap-1">
                <strong>{t("to")}</strong>
                <span>{data?.date?.date_to} </span>
              </p>
            </div>
          }
        />
      ),
    },

    {
      title: "number_of_guests",
      value: (
        <div className="flex items-center gap-6 flex-wrap">
          <Badge
            type="disabled"
            content={`${data?.persons_max_num} ${t("adults")}`}
          />
          <Badge
            type="disabled"
            content={`${data?.kids_max_num} ${t("kids")}`}
          />
        </div>
      ),
    },
    {
      title: "client_name",
      value: <Badge type="disabled" text={data?.user?.full_name ?? "-"} />,
    },
    {
      title: "client_rate",
      value: <Badge type="disabled" content={<Rate rate={0} />} />,
    },
    {
      title: "order_status",
      value: (
        <div className="flex items-center gap-6">
          <Badge type={getOrderBadgeType(data?.status)} text={data?.status} />
          {data?.extra_order?.length > 0 && (
            <Badge type="warning" text="extension" />
          )}
        </div>
      ),
    },
  ];
  const columns = [
    { field: "id", header: "serial_number" },
    {
      field: "title",
      header: "description",
      body: (item) => (
        <span>
          {currentLanguageCode === "en" ? item?.title : item?.title_ar}
        </span>
      ),
    },
    {
      field: "quantity",
      header: "quantity",
      body: (item) => {
        const text = {
          event: "tickets",
          service: "tickets",
          special_item: "",
          hut: "days",
        };
        const quantity = item?.quantity
          ? `${item?.quantity} ${t(text[item?.type])}`
          : "-";
        return <span>{quantity}</span>;
      },
    },
    {
      field: "price",
      header: "price",
      body: (item) => (
        <span>{item?.price ? `${item?.price}${t("sar")}` : "-"}</span>
      ),
    },
    {
      field: "total_cost",
      header: "total_cost",
      body: (item) => (
        <span>
          {item?.total_price ? `${item?.total_price}${t("sar")}` : "-"}
        </span>
      ),
    },
  ];
  //______________ function _________________

  const handleRefuseCancelation = async () => {
    try {
      setLoadingCancelation(true);
      const response = await axiosInstance.post(`${API.orders.refund}${id}/`);
      if (response.status === 200) {
        setVisible(false);
        setData((pre) => ({ ...pre, status: "refuned" }));
        toast.success(t("success_refuse_order_cancelation"));
      }
    } catch (err) {
      handleErrors(err, t);
    } finally {
      setLoadingCancelation(false);
    }
  };

  if (
    error?.error === "Booking not found." ||
    error?.detail === "No Booking matches the given query."
  ) {
    return (
      <Page_Nout_Found
        pageTitle={pageTitle}
        message="invalid_order_details"
        bntName="go_back_button"
        bntCta={isComingFromQr ? "/admin/qr" : "/orders"}
      />
    );
  }
  return (
    <>
      <Page_Layout
        page={pageTitle}
        containerClassName=" !gap-6 md:!gap-10  lg:!gap-16"
      >
        {isCommingFromScan && (
          <section className="flex flex-col gap-6 md:gap-10 lg:gap-16">
            <Page_Header title="scan_qr_code" />
            <div className="  flex_center text-center gap-2 sm:gap-10 lg:gap-14 page py-5 px-4">
              <CheckIcon
                width={isMobile ? 60 : isTablet ? 80 : 100}
                height={isMobile ? 60 : isTablet ? 80 : 100}
              />
              <h1 className=" headline_sm font-semibold text-secondary-dark ">
                {t("qr_successfully_ticket")}
              </h1>
            </div>
          </section>
        )}
        <section className="flex flex-col gap-6">
          <Page_Header title={sectionTitle} />
          <section className="flex flex-col gap-4">
            <Details
              list={list}
              containerClassName="page gap-2 lg:gap-10  !p-4 !flex-row"
              ulClassName="flex flex-col gap-3"
              titleClassName="title_xl min-w-[90px] lg:!min-w-[160px] text-[#22303EE5]!"
              loading={loading}
            />

            {isComingFromQr && <Qr_Logs_Table id={id} />}
            <div className="page p-4 flex flex-col gap-6">
              <Page_Header
                title={
                  role === "admin" ? "event_service_details" : "service_details"
                }
              />{" "}
              <Table_Container
                emptyText={
                  role === "admin"
                    ? "no_events_and_services_yet"
                    : "no_services_yet"
                }
                columns={columns}
                loading={loading}
                data={data?.main_order}
                hasFilter={false}
                hasPagination={false}
              />
            </div>
            {/* will show if has any extra service or days */}
            {data?.extra_order?.length > 0 && (
              <div className="page p-4 flex flex-col gap-6">
                <Page_Header title="types_of_extension" />{" "}
                <Table_Container
                  emptyText="no_extension_yet"
                  columns={columns}
                  loading={loading}
                  data={data?.extra_order}
                  hasFilter={false}
                  hasPagination={false}
                />
              </div>
            )}
          </section>

          {/* subtotal */}
          <div className="page p-4 flex justify-between  gap-3">
            <span className="text-primary-dark body_sm font-semibold flex-1">
              {t("subtotal")}
            </span>
            <span className="text-primary-dark font-black headline_lg">
              {data?.total_price > 0 ? `${data?.total_price} ${t("sar")}` : "0"}
            </span>
          </div>
          {data?.status === "cancelled" && (
            <Form_Actions_Btn
              mainBtnCta={() => setVisible(true)}
              backBtnCta={() => setRefundToggleModal(true)}
              mainBtnName="accept_status"
              secondaryBtnName="refuse"
              loading={loading}
            />
          )}
        </section>
      </Page_Layout>

      <Modal
        open={refundToggleModal}
        onClose={() => setRefundToggleModal(false)}
        loading={loadingCancelation}
      >
        <Refund_Form
          onClose={() => setRefundToggleModal(false)}
          setData={setData}
        />
      </Modal>
      {/* accept status */}
      {/* refuse */}
      <Confirmation_Modal
        open={visible}
        onClose={() => setVisible(false)}
        loading={loadingCancelation}
        deleteText="confirm_accept_cancellation"
        handleClick={handleRefuseCancelation}
      />
    </>
  );
};

export default Order_Details;
