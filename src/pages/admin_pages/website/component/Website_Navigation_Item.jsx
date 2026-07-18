import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/shared/button/Button";
import { currentLanguageCode } from "../../../../utils/switchLang";
import { ArrowLongIcon } from "../../../../assets/icons/Icon";

const Website_Navigation_Item = ({ list }) => {
  const { t } = useTranslation();
  return (
    <ul className="flex flex-col gap-6">
      {list.map((nav) => (
        <li
          key={nav.title}
          className="flex items-center justify-between gap-1 bg-light p-4 rounded-xl"
        >
          <h3 className=" headline_sm font-semibold flex-1 text-secondary-light">
            {t(nav.title)}
          </h3>
          <Button
            type="white"
            to={nav.to}
            size="md"
            className="min-w-[91px]"
            iconLeft={
              <span
                className={currentLanguageCode === "en" ? "" : "rotate-180"}
              >
                <ArrowLongIcon />
              </span>
            }
          >
            {t("open")}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Website_Navigation_Item;
