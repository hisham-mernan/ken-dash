import React, { useState } from "react";
import { currentLanguageCode } from "../../utils/switchLang";
import { formatDate } from "../../hooks/formatDateAndTime";
import { useTranslation } from "react-i18next";
import Button from "../../components/shared/button/Button";
import { ArrowLongIcon, UserIcon2 } from "../../assets/icons/Icon";
import axiosInstance from "../../service/axiosInstance";
import { API } from "../../service/apiUrl";
import { handleErrors } from "../../utils/handleError";
import { useNavigate } from "react-router-dom";

const Notification_Item = ({ item, setData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const markNotificationAsRead = async () => {
    try {
      console.log(item.id);
      const response = await axiosInstance.put(
        `${API.notification.update}${item?.id}/`
      );
      if (response.status === 200) {
        if (setData) {
          setData((pre) =>
            pre?.map((notification) =>
              notification?.id === item?.id
                ? { ...notification, mark_as_read: true }
                : notification
            )
          );
        }
      }
    } catch (err) {
      handleErrors(err, t);
    }
  };
  const notificationImgAndAction = () => {
    switch (item?.type) {
      case "booking ":
      case "need_refund":
      case "extra":
      case "supplier_extra":
      case "booking_paid":
        return `/orders/${item?.object_id}/details`;
      case "support":
        return `/support/${item?.object_id}/reply`;

      case "supplier_tickets":
      default:
        return null;
    }
  };
  const link = notificationImgAndAction();
  return (
    <li
      onClick={() => {
        if (!item?.mark_as_read) {
          markNotificationAsRead();
        }
      }}
      role="button"
      className={`${
        link ? "" : item?.mark_as_read ? "" : "cursor-pointer"
      } flex items-start sm:items-center flex-col sm:flex-row justify-between gap-4 md:gap-2.5 page px-3.5 py-4 !rounded-lg  `}
    >
      <div
        className={`flex-1 flex gap-2.5 ${
          item?.mark_as_read ? "" : "opacity-50"
        }`}
      >
        <span className="flex_center w-10 h-10 bg-font-light rounded-[10px]">
          <UserIcon2 />
        </span>
        <div className="grid gap-1.5">
          <h2 className="text-grey-600 text-sm">
            {currentLanguageCode === "en" ? item?.message : item?.message_ar}
          </h2>
          <p className="text-grey-450 font-[300] text-xs">
            {item?.datetime ? formatDate(item?.datetime) : "-"}
          </p>
        </div>
      </div>
      <div className="w-full sm:w-fit">
        {link && (
          <Button
            type="light"
            size="md"
            onClick={() => {
              navigate(link);
            }}
            iconLeft={
              <span
                className={currentLanguageCode === "en" ? "" : "rotate-180"}
              >
                <ArrowLongIcon />
              </span>
            }
          >
            {t("check_now")}
          </Button>
        )}
      </div>
    </li>
  );
};

export default Notification_Item;
