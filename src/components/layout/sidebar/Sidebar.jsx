import React from "react";
// lib
import { useTranslation } from "react-i18next";

// assets
import { Logo } from "../../../assets/images/Image";

// context
import { useAuth } from "../../../context/Auth_Context";

// hooks
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { Link, NavLink } from "react-router-dom";
import {
  BillIcon,
  EventIcon,
  GearIcon,
  HutIcon,
  LanguageIcon,
  LinearNotifcationIcon,
  LinearSettingIcon,
  LogoutIcon,
  PackageIcon,
  QrScannarIcon,
  SmsStarIcon,
  SpecialItemsIcon,
  StatIcon,
  SupplierIcon,
  SupportIcon,
  UserIcon,
  UsersIcon,
} from "../../../assets/icons/Icon";
import { currentLanguageCode, switchLang } from "../../../utils/switchLang";
import { useMediaQuery } from "react-responsive";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  const close = () => {
    setOpenSidebar(false);
  };
  const sidebarRef = useOutsideClick(close);
  const adminList = [
    {
      id: 0,
      title: "dashboard",
      path: "/dashboard",
      icon: <StatIcon />,
    },
    {
      id: 1,
      title: "orders",
      path: "orders",
      icon: <LinearNotifcationIcon />,
    },
    {
      id: 2,
      title: "qr_scanner",
      path: "/admin/qr",
      icon: <QrScannarIcon />,
    },
    {
      id: 3,
      title: "users",
      path: "/admin/users",
      icon: <UsersIcon />,
    },
    {
      id: 4,
      title: "billings",
      path: "bill",
      icon: <BillIcon />,
    },
    {
      id: 5,
      title: "huts",
      path: "/admin/huts",
      icon: <HutIcon />,
    },
    {
      id: 6,
      title: "events",
      path: "event",
      icon: <EventIcon />,
    },
    {
      id: 8,
      title: "special_items",
      path: "/admin/special-items",
      icon: <SpecialItemsIcon />,
    },
    {
      id: 7,
      title: "suppliers",
      path: "/admin/supplier",
      icon: <SupplierIcon />,
    },
    {
      id: 9,
      title: "feadbacks",
      path: "/admin/feadback",
      icon: <SmsStarIcon />,
    },
    {
      id: 10,
      title: "support",
      path: "support",
      icon: <SupportIcon />,
    },
    {
      id: 9,
      title: "website",
      path: "/admin/website",
      icon: <LinearSettingIcon />,
    },
  ];
  const supplierList = [
    {
      id: 0,
      title: "dashboard",
      path: "/dashboard",
      icon: <StatIcon />,
    },
    {
      id: 5,
      title: "products",
      path: "/product",
      icon: <PackageIcon />,
    },
    {
      id: 5,
      title: "events",
      path: "event",
      icon: <EventIcon />,
    },
    {
      id: 1,
      title: "orders",
      path: "orders",
      icon: <LinearNotifcationIcon />,
    },
    {
      id: 3,
      title: "billings",
      path: "bill",
      icon: <BillIcon />,
    },
    {
      id: 8,
      title: "support",
      path: "support",
      icon: <SupportIcon />,
    },
  ];
  const sidebarList = isAdmin ? adminList : supplierList;
  return (
    <div
      className={`sidebar  ${
        openSidebar
          ? "  opacity-100 bg-[#0c0c0c32] visible z-[1000] fixed top-0 bottom-0 inset-0 w-full h-full"
          : "opacity-0 invisible md:opacity-100 md:visible"
      }`}
    >
      <aside
        ref={sidebarRef}
        className={` overflow-y-auto transition-all ease-in-out duration-300 ${
          openSidebar
            ? "visible  opacity-100 "
            : `${
                currentLanguageCode === "en"
                  ? "-translate-x-full"
                  : "translate-x-full"
              }   invisible opacity-0 md:visible md:translate-x-0  md:opacity-100`
        } fixed overflow-hidden md:top-4 lg:top-8  py-8 lg:py-6 px-5 lg:px-5 flex flex-col  gap-6    bg-white ${
          currentLanguageCode === "en" ? " sm:rounded-2xl " : " sm:rounded-2xl"
        } md:rounded-2xl h-dvh lg:h-[670px] w-[250px]  md:w-[220px] lg:w-[245px]`}
      >
        <Link
          to={"/"}
          onClick={() => {
            close();
          }}
          className="flex items-center justify-center outline-none shadow-none"
        >
          <img src={Logo} alt="logo" className="h-[28px] object-contain " />
        </Link>
        <div className=" overflow-y-auto flex flex-col justify-between gap-0 sm:gap-3 lg:gap-5 flex-1">
          <ul className="flex flex-col gap-1 nav ">
            {sidebarList.map(
              (item) =>
                item && (
                  <li key={item.id} className="flex_center_y w-full  ">
                    <NavLink
                      className={`flex_center_y w-full gap-1 text-secondary-dark rounded-lg px-3 py-2 h-[35px] text-sm`}
                      to={item?.path}
                      onClick={() => {
                        close();
                      }}
                    >
                      <span className="flex_center w-4 h-4 icon ">
                        {item?.icon}
                      </span>
                      <span>{t(item.title)}</span>
                    </NavLink>
                  </li>
                )
            )}
          </ul>
          <footer className=" nav_footer flex flex-col gap-1">
            <div
              onClick={switchLang}
              className=" cursor-pointer flex_center_y w-fit gap-1 text-secondary-dark rounded-lg px-3 py-2 h-[35px] text-sm"
              role="button"
              aria-label="switch language"
            >
              <span>
                <LanguageIcon width="20" height="20" />
              </span>
              <span className="text-secondary-dark">
                {currentLanguageCode === "en" ? "ع" : "En"}
              </span>
            </div>
            <div
              onClick={logout}
              className=" cursor-pointer flex_center_y w-fit gap-1 text-secondary-dark rounded-lg px-3 py-2 h-[35px] text-sm"
              role="button"
            >
              <span
                className={currentLanguageCode === "en" ? "" : "rotate-180"}
              >
                <LogoutIcon />
              </span>
              <span className="text-secondary-dark">{t("logout")}</span>
            </div>
            {/* <div className="px-3">
              <span className="bg-secondary-4 w-7 h-7 rounded-full flex_center">
                <UserIcon width="15" height="15" />
              </span>
            </div> */}
          </footer>
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
