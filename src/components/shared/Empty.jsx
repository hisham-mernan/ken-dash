import React from "react";
import { useTranslation } from "react-i18next";
import { NoteIcon } from "../../assets/icons/Icon";
// import { EmptyIcon } from "../../assets/images/Image";

const Empty = ({
  src,
  emptyText = "",
  className = "",
  imgClassName,
  children,
  hasDefaultIcon = true,
  variant = "primary",
  size = "lg",
  icon,
}) => {
  const { t } = useTranslation();
  const style = {
    primary: { text: "text-[#0A1F1A]", fill: "#6E6E6E" },
    light: {
      text: "text-secondary-light",
      fill: "var(--color-secondary-light)",
    },
  };
  const sizes = {
    lg: "title_lg",
    md: "body_md",
  };
  return (
    <div className={`${className} h-[50vh] flex_center flex-col gap-2 `}>
      {src && <img loading="lazy" decoding="async" src={src} alt="empty" className={`${imgClassName ?? ""}`} />}
      {icon && !hasDefaultIcon && icon}
      {hasDefaultIcon && <NoteIcon fill={style[variant].fill} />}
      <p className={`${sizes[size]}  ${style[variant].text} `}>
        {t(emptyText)}
      </p>
      {children}
    </div>
  );
};

export default Empty;
