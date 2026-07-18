import React, { useRef } from "react";

// lib
import { Skeleton } from "primereact/skeleton";
import { useTranslation } from "react-i18next";
import { Calendar } from "primereact/calendar";

// utils
import { CalendarIcon } from "../../../assets/icons/Icon";

const Input_Calendar = ({
  value,
  placeholder,
  error,
  handleChange,
  id,
  loading,
  disabled,
  viewOnly,
  icon,
}) => {
  const { t } = useTranslation();
  const calendarRef = useRef();

  const handleIconClick = () => {
    if (calendarRef.current) {
      calendarRef.current.show();
    }
  };

  if (loading) {
    return (
      <div className="input_gap">
        <Skeleton width={80} height={15} borderRadius={5} />{" "}
        <Skeleton width="100%" height={40} borderRadius={8} />{" "}
      </div>
    );
  }

  return (
    <div
      className={`relative input  flex_center_y ${
        disabled ? "disabled" : ""
      }   ${error ? "!border-red-dark" : ""}`}
    >
      <div onClick={handleIconClick} className="cursor-pointer">
        {icon ? icon : <CalendarIcon fill="#292D32" width="24" height="24" />}
      </div>
      <Calendar
        value={value}
        ref={calendarRef}
        inputId={id}
        onChange={(e) => handleChange(e)}
        placeholder={t(placeholder)}
        disabled={disabled}
        className={`flex-1 !border-none !shadow-none w-full h-full ${
          disabled ? "disabled" : ""
        } ${viewOnly ? "viewonly" : ""} `}
        minDate={new Date()}
      />
    </div>
  );
};

export default Input_Calendar;
