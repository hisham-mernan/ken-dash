import React from "react";
import { useTranslation } from "react-i18next";

const Badge = ({ text = "", type, content }) => {
  const { t } = useTranslation();

  const state = () => {
    switch (type) {
      case "success":
        return { bg: "bg-green-500", color: "text-green-500 " };
      case "error":
        return { bg: "bg-red-normal", color: "text-red-normal" };
      case "warning":
        return { bg: "bg-orange-300", color: "text-orange-300" };
      case "disabled":
        return { bg: "bg-[#7E7E7E]", color: "text-[#7E7E7E]" };
      case "blue":
        return { bg: "bg-[#0059F3]", color: "text-[#0059F3]" };
      default:
        return { bg: "bg-primary-light", color: "text-primary-light" };
    }
  };
  const { bg, color } = state();
  return (
    <div className="flex_center_y gap-2">
      <span className={`${bg} flex_center w-2 h-2 rounded-full`}></span>
      <p className={`${color} text-sm capitalize font-normal `}>{t(text)}</p>
      {content && (
        <div className={`${color} flex-1 text-sm capitalize font-normal `}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Badge;
