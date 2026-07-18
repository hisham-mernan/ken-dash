import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../loaders/Spinner";

const Button = ({
  children,
  onClick,
  state,
  to,
  type = "primary",
  role = "button",
  size = "xl",
  rounded = "lg",
  textSize,
  disabled,
  loading,
  className,
  target,
  loaderDir = "right",
  hasFullWidth = false,
  iconRight,
  iconLeft,
}) => {
  const sizes = {
    xl: "h-[48px] 2xl:h-[50px]  ",
    lg: "h-[48px]   ",
    md: "h-[38px]",
    xs: "h-[28px]",
  };
  const radious = {
    full: "rounded-full",
    xl: "rounded-[10px]",
    lg: "rounded-lg",
  };
  const textSizes = {
    xl: "title_lg font-semibold",
    lg: "text-base font-normal",
    md: "text-sm font-normal",
  };
  const base = `${sizes[size]} ${radious[rounded]} ${
    textSizes[textSize ?? size]
  } ${hasFullWidth ? "w-full" : "w-fit"}   ${
    disabled || loading ? "cursor-default" : "cursor-pointer"
  } disabled:cursor-default outline-none       p-4 flex items-center justify-center gap-2 transition-all ease-in-out duration-300  `;
  const styles = {
    primary: `${base} bg-secondary-light hover:bg-secondary-4 disabled:bg-secondary/10 disabled:text-secondary/30  text-white `,
    secondary: `${base} bg-[#A5938180] hover:bg-secondary-light disabled:bg-secondary/10 disabled:text-secondary/30  text-white `,
    light: `${base} !font-bold border-[.1px] border-secondary-light bg-light !text-sm  text-secondary-2 `,
    white: `${base} !font-bold border-[.1px] border-secondary-light bg-white !text-sm  text-secondary-2 `,
    outline: `${base} border border-[#C8C8C891] bg-white text-[#5D5D5D]`,
    error_outline: `${base} border-[.1px] border-orange-500 bg-orange-100`,
    dotted: `${base} border-dashed border border-[#C8C8C8] text-[#BBBEBD] !font-light `,
  };

  const spinnerFillColor = {
    error: "fill-error",
    primary: "!fill-neutral-200  !text-secondary",
    outline: "!text-neutral-200  !fill-secondary",
  };
  if (to)
    return (
      <Link
        to={to}
        target={target}
        state={state}
        className={`${styles[type]}  ${className}  `}
      >
        {" "}
        {iconRight}
        {children}
        {iconLeft}
      </Link>
    );
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      type={role}
      className={`${styles[type]}  ${className}`}
    >
      {loading ? (
        loaderDir === "right" && <Spinner className={spinnerFillColor[type]} />
      ) : (
        <span>{iconRight}</span>
      )}
      {children}{" "}
      {loading ? (
        loaderDir === "left" && <Spinner className={spinnerFillColor[type]} />
      ) : (
        <span>{iconLeft}</span>
      )}
    </button>
  );
};
export default Button;
