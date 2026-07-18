import React, { useEffect, useState } from "react";

// lib
import { useTranslation } from "react-i18next";

// components
import Empty from "../../components/shared/Empty";
import Main_Header from "../../components/layout/header/Main_Header";
import Page_Header from "../../components/layout/header/Page_Header";

// services
import { API } from "../../service/apiUrl";
import axiosInstance from "../../service/axiosInstance";

// utils
import { getUserRole } from "./../../utils/auth";
import { handleErrors } from "../../utils/handleError";

import { currentLanguageCode } from "../../utils/switchLang";

import Order_Qr_Table from "../../components/shared/order/Order_Qr_Table";
import { Skeleton } from "primereact/skeleton";

const role = getUserRole();
const Order_List = () => {
  const { t } = useTranslation();
  const [dataLoader, setDataLoader] = useState(false);
  const [upcoming, setUpcoming] = useState();

  //______________ function _________________
  const getUpcomingOrders = async () => {
    try {
      setDataLoader(true);
      const response = await axiosInstance.get(API.orders.upcoming);
      if (response.status === 200) {
        setUpcoming(response.data);
      }
    } catch (err) {
      handleErrors(err, t);
    } finally {
      setDataLoader(false);
    }
  };
  useEffect(() => {
    if (role === "admin") {
      getUpcomingOrders();
    }
  }, [role]);
  return (
    <section className="grid gap-5">
      <Main_Header page="orders" />
      {role === "admin" && (
        <section className="page main_p main_grid">
          <Page_Header title="upcoming_booking" />
          {dataLoader ? (
            <section>
              <Skeleton height="80px" />
            </section>
          ) : upcoming?.length > 0 ? (
            <section className="flex flex-col gap-4">
              {upcoming?.slice(0, 4)?.map((item, index) => (
                <div
                  key={item?.id}
                  className={`flex flex-col gap-2.5 py-4 ${
                    index === 0
                      ? "bg-secondary-5/20 border border-secondary-light"
                      : "bg-light"
                  }  px-6 rounded-[10px] `}
                >
                  <h2 className="truncate text-dmv-black !font-semibold body_lg">
                    {currentLanguageCode === "en"
                      ? item?.hut_title ?? "-"
                      : item?.hut_title_ar ?? "-"}
                  </h2>
                  <div className="text-[#0D0D0D99] body_sm flex flex-wrap  gap-6 ">
                    <p className="flex_center_y gap-1">
                      <span className="font-semibold">{t("from")}</span>
                      <span>
                        {item?.date?.date_from ? item?.date?.date_from : "-"}
                      </span>
                    </p>
                    <p className="flex_center_y gap-1">
                      <span className="font-semibold">{t("to")}</span>
                      <span>
                        {item?.date?.date_to ? item?.date?.date_to : "-"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <Empty
              emptyText="no_upcoming_orders_yet"
              className="!h-[15vh]"
              size="md"
              hasDefaultIcon={false}
            />
          )}
        </section>
      )}
      <Order_Qr_Table pageName="order" />
    </section>
  );
};

export default Order_List;
