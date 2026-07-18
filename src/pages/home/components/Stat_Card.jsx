import React from "react";
import { useTranslation } from "react-i18next";
import { SarIcon } from "../../../assets/icons/Icon";

const Stat_Card = ({ data }) => {
  const { t } = useTranslation();
  return (
    <section className="h-[105px]  sm:ps-8">
      <div className="relative flex gap-0 page px-4 sm:ps-[60px] !rounded-lg h-full items-center gap-3 ">
        <span className="sm:absolute sm:-start-8 flex_center w-16 h-16 bg-light rounded-full">
          {data?.icon}
        </span>
        <div className=" flex flex-col gap-2 w-fit overflow-hidden  ">
          <h2 className="text-secondary-light body_lg">{t(data?.title)}</h2>
          <p className="flex items-center gap-1 text-secondary headline_lg truncate  ">
            {data?.value}
            {data?.sub && (
              <sub className="text-secondary-light text-[11px]">
                {data?.sub}
              </sub>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stat_Card;
