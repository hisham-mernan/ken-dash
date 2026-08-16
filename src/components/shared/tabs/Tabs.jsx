import React from "react";
import { useTranslation } from "react-i18next";

const Tabs = ({
  list,
  variant = "equal",
  filter,
  setFilter,
  field,
  onClick,
}) => {
  const { t } = useTranslation();
  const style = {
    equal: { style: "w-full sm:w-1/2" },
    flex: { style: "w-full sm:w-1/2 lg:w-fit", active: "md:flex-1" },
  };
  return (
    <div className="flex_center_y flex-col sm:flex-row gap-3 lg:gap-6 2xl:gap-8">
      {list?.map((item) => (
        <section
          key={item?.value}
          className={`flex gap-6  cursor-pointer card_p  ${
            style[variant]?.style
          } ${
            item?.value === filter?.[field]
              ? `card ${style[variant]?.active} `
              : " page"
          } `}
          onClick={() => {
            if (filter?.[field] !== item?.value) {
              setFilter({ [field]: item?.value });
            }
            if (onClick) {
              onClick(item?.value);
            }
          }}
        >
          <figure
            className={`flex_center bg-light border border-white w-[52px] h-[52px] lg:w-[65px] lg:h-[65px] rounded-full`}
          >
            {item?.icon ? (
              item?.icon
            ) : (
              <img loading="lazy" decoding="async"
                src={item?.img}
                alt="img"
                className=" w-8 h-8 lg:w-[38px] lg:h-[38px]"
              />
            )}
          </figure>
          <div className="flex flex-col gap-2 w-fit lg:min-w-[200px] 2xl:min-w-[258px]">
            <h2 className="text-secondary-1 title_xl">{t(item?.title)}</h2>
            <p className="text-secondary-light body_sm">{t(item?.des)}</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Tabs;
