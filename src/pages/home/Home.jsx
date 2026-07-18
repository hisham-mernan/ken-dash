import React from "react";

import { useTranslation } from "react-i18next";
import {
  AvalibleEventtIcon,
  AvalibleProductIcon,
  ChatIcon,
  CheckIcon,
  InboxIcon,
  SarIcon,
  UploadIcon,
} from "../../assets/icons/Icon";
import Stat_Card from "./components/Stat_Card";
import { formatNumber } from "../../utils/formatNumber";
import Page_Layout from "../../components/layout/Page_Layout";
import { getUserRole } from "../../utils/auth";
import Bar_Chart from "./components/Bar_Chart";
import { HomeDountChart } from "../../assets/images/Image";
import Order_Qr_Table from "../../components/shared/order/Order_Qr_Table";
import useGetData from "./../../hooks/useGetData";
import { API } from "../../service/apiUrl";
const role = getUserRole();
const Home = () => {
  const { t } = useTranslation();
  const isAdmin = role === "admin";
  const { data: cardData } = useGetData(
    isAdmin ? API.admin.home.cards : API.supplier.home.cards
  );

  const adminStatList = [
    {
      icon: <CheckIcon />,
      title: "total_booking",
      value: cardData?.total_bookings
        ? formatNumber(cardData?.total_bookings)
        : 0,
    },
    {
      icon: <InboxIcon />,
      title: "revenue_overview",
      value: cardData?.total_revenue
        ? formatNumber(cardData?.total_revenue)
        : 0,
      sub: <SarIcon />,
    },
    {
      icon: <ChatIcon />,
      title: "occupancy_rates",
      value: cardData?.average_rating,
    },
  ];
  const supplierStatList = [
    {
      icon: <UploadIcon />,
      title: "new_orders",
      value: cardData?.related_orders_count
        ? formatNumber(cardData?.related_orders_count)
        : 0,
    },
    {
      icon: <AvalibleProductIcon />,
      title: "avalible_products",
      value: cardData?.services_count
        ? formatNumber(cardData?.services_count)
        : 0,
    },
    {
      icon: <AvalibleEventtIcon />,
      title: "avalible_events",
      value: cardData?.events_count ? formatNumber(cardData?.events_count) : 0,
      sub: `${t("events")}`,
    },
  ];

  const list = isAdmin ? adminStatList : supplierStatList;

  return (
    <Page_Layout>
      <div className="flex flex-col gap-10 mt-6 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4 xl:gap-8">
          {list?.map((item) => (
            <Stat_Card key={item?.title} data={item} />
          ))}
        </div>
        {isAdmin && (
          <div className="grid gap-3 lg:gap-6 md:grid-cols-[1fr_280px]">
            <div className="page px-3 py-6 sm:p-6 ">
              <header className="py-6 flex flex-col gap-1">
                <h2 className="text-text-primary title_lg font-semibold">
                  {t("total_revenue")}
                </h2>
                <p className="flex_center_y gap-2">
                  <span className="flex_center bg-secondary-light w-[10px] h-[10px] rounded-full" />
                  <span className="text-[#22303EB2] text-[13px]">
                    {new Date().getFullYear()}
                  </span>
                </p>
              </header>
              <Bar_Chart />
            </div>
            <div className="page py-6 px-3 sm:p-6 flex_center_y flex-col text-center justify-center gap-6 ">
              <div className="flex flex-col items-center justify-center gap-9">
                <h2 className="text-primary-3 title_lg font-semibold">
                  {t("orders")}
                </h2>
                <figure className="flex-1 mb-4 ">
                  <img
                    src={HomeDountChart}
                    alt="chart"
                    className="h-[186px] w-[186px]"
                  />
                </figure>
              </div>
              <div className="w-full h-[.5px] bg-[#B1B1B1]" />
              <strong
                className="text-xs text-[#767676] tracking-[1px] "
                dangerouslySetInnerHTML={{
                  __html: `${t("you_got_orders", { count: 0 })}`,
                }}
              />
            </div>
          </div>
        )}
        <div className="page grid ">
          <Order_Qr_Table pageName="recent_orders" />
        </div>
      </div>
    </Page_Layout>
  );
};

export default Home;
