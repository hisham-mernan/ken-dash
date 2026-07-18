import { Skeleton } from "primereact/skeleton";
import React from "react";
import { useTranslation } from "react-i18next";

const Details = ({
  title,
  list = [],
  loading,
  titleClassName = "text-sm",
  containerClassName,
  ulClassName,
}) => {
  const { t } = useTranslation();
  return (
    <div className="">
      {title && (
        <h3 className="text-primary-900 heading2 font-medium">{t(title)}</h3>
      )}
      <ul className={ulClassName}>
        {list?.map((item, index) =>
          loading ? (
            <li
              key={index}
              className="flex items-start  py-3 sm:py-4 px-1 sm:px-2"
            >
              <div className="flex w-1/3 lg:w-1/5">
                <Skeleton width={150} height={15} borderRadius={50} />
              </div>
              <div className="w-1/3 lg:w-2/5">
                <Skeleton width="100" height={15} borderRadius={50} />
              </div>
            </li>
          ) : (
            <li
              key={index}
              className={`flex items-center flex-col sm:flex-row gap-2  py-3 sm:py-4 px-1 sm:px-2 ${
                containerClassName ?? ""
              } `}
            >
              <span
                className={`flex  min-w-[80px] text-[#201D23]  font-semibold capitalize   ${
                  titleClassName ?? ""
                }`}
              >
                {t(item?.title)}
              </span>
              <div
                className={`flex-1 text-wrap  text-[#201D23CC] text-sm font-normal ${
                  item?.valueClassName ?? ""
                } `}
              >
                {item?.value}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Details;
