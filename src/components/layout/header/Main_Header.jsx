import React from "react";
import {
  BillIcon,
  BurgerIcon,
  EventIcon,
  GearIcon,
  HutIcon,
  LanguageIcon,
  LinearNotifcationIcon,
  LinearSettingIcon,
  NotFoundIcon,
  NotificationIcon,
  PackageIcon,
  QrScannarIcon,
  SmsStarIcon,
  SpecialItemsIcon,
  StatIcon,
  SupplierIcon,
  SupportIcon,
  UsersIcon,
} from "../../../assets/icons/Icon";
import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import { currentLanguageCode, switchLang } from "../../../utils/switchLang";
import useGetData from "../../../hooks/useGetData";
import { API } from "../../../service/apiUrl";

const Main_Header = ({ page }) => {
  const { t } = useTranslation();
  const { setOpenSidebar } = useOutletContext();
  const { data: notificationCount } = useGetData(API.notification.count);

  const headerTitle = () => {
    switch (page) {
      case "dashboard":
        return { title: "dashboard", icon: <StatIcon /> };
      case "product":
        return { title: "products", icon: <PackageIcon /> };
      case "orders":
        return { title: "orders", icon: <LinearNotifcationIcon /> };
      case "users":
        return { title: "users", icon: <UsersIcon /> };
      case "billings":
        return { title: "billings", icon: <BillIcon /> };
      case "qr":
        return { title: "qr_scanner", icon: <QrScannarIcon /> };
      case "huts":
        return { title: "huts", icon: <HutIcon /> };
      case "events":
        return { title: "events", icon: <EventIcon /> };
      case "supplier":
        return { title: "suppliers", icon: <SupplierIcon /> };
      case "feedbacks":
        return { title: "feedbacks", icon: <SmsStarIcon /> };
      case "website":
        return { title: "website", icon: <LinearSettingIcon /> };
      case "support":
        return { title: "support", icon: <SupportIcon /> };
      case "special_items":
        return { title: "special_items", icon: <SpecialItemsIcon /> };
      case "settings":
        return { title: "settings", icon: <GearIcon /> };
      case "404":
        return { title: "not_found", icon: <NotFoundIcon /> };
      default:
        return { title: "dashboard", icon: <StatIcon /> };
    }
  };
  const { title, icon } = headerTitle();
  return (
    <header className=" bg-white py-4 px-5 main_shadow border border-[#FFFAF4] rounded-xl flex justify-between gap-2 ">
      <div className="flex_center_y gap-3">
        {/* <span
          onClick={() => {
            setOpenSidebar(true);
          }}
          className="flex md:hidden cursor-pointer"
        >
          <BurgerIcon />
        </span> */}
        <div className="flex-1 flex_center_y gap-1.5">
          {icon}
          <span className="text-secondary-dark text-base">{t(title)}</span>
        </div>
      </div>
      <div className="flex_center_y gap-2">
        <Link to="/notification" className="relative flex_center w-9 h-9">
          <NotificationIcon />
          {notificationCount?.notification_count > 0 && (
            <span
              dir="ltr"
              className={`flex_center bg-red-dark absolute end-[7px] top-[5px] w-2 h-2 rounded-full text-white text-[8px] `}
            />
          )}
        </Link>
        <span
          onClick={() => {
            setOpenSidebar(true);
          }}
          className="flex md:hidden cursor-pointer"
        >
          <BurgerIcon />
        </span>

        {/* <div
          onClick={() => {
            switchLang();
          }}
          className="items-center gap-1 cursor-pointer flex   "
        >
          <LanguageIcon width="22" height="22" />
          <span className="text-secondary-dark">
            {currentLanguageCode === "en" ? "En" : "ع"}
          </span>
        </div> */}
      </div>
    </header>
  );
};

export default Main_Header;
