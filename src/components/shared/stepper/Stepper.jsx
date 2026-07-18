import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Stepper = ({ steps }) => {
  const { t } = useTranslation();
  const currentIndex = steps.findIndex(
    (step) => location.pathname === step.link
  );
  return (
    <nav className="flex_center_y relative justify-between">
      <span className="flex_center absolute bg-secondary-5 h-[2px] w-full z-[1]" />

      {steps.map((item, index) => {
        const Icon = item.Icon;
        const isActive = index <= currentIndex;

        return (
          <NavLink
            to={item.link}
            key={item.id}
            className={`flex_center relative z-10  w-[40px] h-[40px] sm:h-[50px] lg:h-[60px] sm:min-w-[150px] lg:min-w-[200px] 2xl:min-w-[240px] border-3 border-secondary-5/44 rounded-full  gap-2 transition-colors duration-300 ${
              item?.link ? "cursor-pointer" : "cursor-default"
            }  ${
              isActive
                ? "bg-secondary-5 text-white cursor-default p-[3px]"
                : "bg-white text-secondary-5/44 "
            }`}
          >
            <Icon
              fill={isActive ? "#FFF" : "#A5938170"}
              strockopacity={isActive ? "1" : "0.44"}
            />
            <span className="hidden sm:flex"> {t(item.title)}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Stepper;
