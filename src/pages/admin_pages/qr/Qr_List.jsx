import React from "react";

// lib
import { useTranslation } from "react-i18next";

// component
import Button from "../../../components/shared/button/Button";
import Main_Header from "../../../components/layout/header/Main_Header";
import Order_Qr_Table from "../../../components/shared/order/Order_Qr_Table";

// icons
import { ArrowLongIcon, QrCodeScannar } from "../../../assets/icons/Icon";

// utils
import { currentLanguageCode } from "../../../utils/switchLang";

const Qr_List = () => {
  const { t } = useTranslation();

  return (
    <section className="main_grid">
      <Main_Header page="qr" />
      <div className="page p-4 md:p-6 lg:p-8 xl:py-[30px] xl:px-[38px] flex flex-col gap-7">
        <header className=" flex flex-col sm:flex-row  items-center justify-between gap-4 sm:gap-1   main_shadow card card_p  ">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="flex_center w-[56px] h-[56px] bg-light rounded-full border border-white ">
              <QrCodeScannar />
            </span>
            <div className="flex flex-col gap-2">
              <h1 className="title_xl">{t("scan_qr_code")}</h1>
              <p className="text-secondary-light text-sm">
                {t("qr_scanner_details")}
              </p>
            </div>
          </div>
          <Button
            size="md"
            type="light"
            iconLeft={
              <span
                className={currentLanguageCode === "en" ? "" : "rotate-180"}
              >
                <ArrowLongIcon />
              </span>
            }
            to="/admin/qr/scannar"
            className=" w-full sm:w-fit"
          >
            {t("open")}
          </Button>
        </header>
      </div>
      <Order_Qr_Table pageName="qr" />
    </section>
  );
};

export default Qr_List;
