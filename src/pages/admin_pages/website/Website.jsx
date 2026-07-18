import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../components/shared/button/Button";
import { ArrowLongIcon } from "../../../assets/icons/Icon";
import { currentLanguageCode } from "../../../utils/switchLang";
import Website_Navigation_Item from "./component/Website_Navigation_Item";

const list = [
  { title: "about_us", to: "about" },
  { title: "our_services", to: "our-services" },
  { title: "special_about_us", to: "special-about-us" },
  { title: "ken_story", to: "ken-story" },
  { title: "faq", to: "faq" },
  { title: "terms_and_conditions", to: "terms-and-conditions" },
];
const Website = () => {
  const { t } = useTranslation();
  return <Website_Navigation_Item list={list} />;
};

export default Website;
