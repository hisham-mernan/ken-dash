import React from "react";
// lib
import { useTranslation } from "react-i18next";

// components
import Button from "../../components/shared/button/Button";

// assets
import { PageNotFoundImg } from "../../assets/images/Image";
import Page_Header from "../../components/layout/header/Main_Header";
import { useAuth } from "../../context/Auth_Context";

const Page_Nout_Found = ({
  bntName = "back_to_home",
  bntCta = "/",
  pageTitle = "404",
  message,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const btnPath = bntCta ?? `/${user?.role}/`;
  return (
    <section className="grid gap-6">
      <Page_Header page={pageTitle} />
      <section className=" page h-[82vh]">
        <div className="flex_center flex-col gap-8 h-full max-w-[550px] mx-auto  ">
          <img
            src={PageNotFoundImg}
            className="w-[300px] sm:w-[400px] md:w-[550px] object-cover"
          />
          {message && (
            <p className="body_lg text-grey-600 max-w-[400px] text-center">
              {t(message)}
            </p>
          )}
          <Button to={btnPath} className="max-w-[300px]" hasFullWidth>
            {t(bntName)}
          </Button>
        </div>
      </section>
    </section>
  );
};

export default Page_Nout_Found;
