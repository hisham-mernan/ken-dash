import { useMemo } from "react";
import { API } from "../service/apiUrl";
import { currentLanguageCode } from "../utils/switchLang";
import useGetData from "./useGetData";

export const useContent = (page = "list", isEdit = false, setValue) => {
  const contentConfig = useMemo(() => {
    if (location.pathname.includes("our-services")) {
      return {
        title: "our_services",
        list: API.admin.website.our_service,
        update: API.admin.website.our_service,
        add: API.admin.website.our_service,
        emptyText: "no_our_services",
        route: "/admin/website/our-services/",
        formatter: (data) =>
          data?.map((item) => ({
            id: item?.id,
            title: currentLanguageCode === "en" ? item?.title : item?.title_ar,
            value:
              currentLanguageCode === "en"
                ? item?.description
                : item?.description_ar,
          })),
        hasTitle: true,
        hasImage: true,
        hasDes: true,
        message_create: "successfully_create_service",
        message_update: "successfully_update_service",
      };
    } else if (location.pathname.includes("faq")) {
      return {
        title: "faq",
        list: API.admin.website.faq,
        update: API.admin.website.faq,
        add: API.admin.website.faq,
        emptyText: "no_faq",
        route: "/admin/website/faq/",

        formatter: (data) =>
          data?.map((item) => ({
            id: item?.id,
            title:
              currentLanguageCode === "en" ? item?.question : item?.question_ar,
            value:
              currentLanguageCode === "en" ? item?.answer : item?.answer_ar,
          })),
        message_create: "successfully_create_faq",
        message_update: "successfully_update_faq",
      };
    } else if (location.pathname.includes("terms-and-conditions")) {
      return {
        title: "terms_and_conditions",
        list: API.admin.website.terms_and_conditions.all,
        update: API.admin.website.terms_and_conditions.detail,
        add: API.admin.website.terms_and_conditions.all,
        emptyText: "no_terms_and_conditions",
        route: "/admin/website/terms-and-conditions/terms/",
        formatter: (data) =>
          data?.map((item) => ({
            id: item?.id,
            title: currentLanguageCode === "en" ? item?.title : item?.title_ar,
            value:
              currentLanguageCode === "en"
                ? item?.description
                : item?.description_ar,
          })),
        hasTitle: true,
        hasImage: false,
        hasDes: true,
        message_create: "successfully_create_terms_and_conditions",
        message_update: "successfully_update_terms_and_conditions",
      };
    } else if (location.pathname.includes("ken-story")) {
      return {
        title: "ken_story",
        list: API.admin.website.ken_story,
        update: API.admin.website.ken_story,
        add: API.admin.website.ken_story,
        emptyText: "no_terms_and_conditions",
        route: "/admin/website/ken-story/",

        formatter: (data) =>
          data?.map((item) => ({
            id: item?.id,
            title: currentLanguageCode === "en" ? item?.title : item?.title_ar,
            value:
              currentLanguageCode === "en"
                ? item?.description
                : item?.description_ar,
            image: item?.image,
          })),
        hasTitle: true,
        hasImage: true,
        hasDes: true,
        message_create: "successfully_create_ken_story",
        message_update: "successfully_update_ken_story",
      };
    } else if (location.pathname.includes("special-about-us")) {
      return {
        title: "special_about_us",
        list: API.admin.website.special_about_us,
        update: API.admin.website.special_about_us,
        add: API.admin.website.special_about_us,
        emptyText: "no_special_about_us",
        route: "/admin/website/special-about-us/",
        formatter: (data) =>
          data?.map((item) => ({
            id: item?.id,
            title: currentLanguageCode === "en" ? item?.title : item?.title_ar,
            image: item?.image,
          })),
        hasTitle: true,
        hasImage: true,
        hasDes: false,
        message_create: "successfully_special_about",
        message_update: "successfully_update_special_about",
      };
    }

    return null;
  }, []);
  const { data, loading, setRefetchData } = useGetData(
    page === "list" ? contentConfig?.list : contentConfig.update,
    contentConfig.formatter,
    page === "list" || isEdit ? true : false,
    setValue
  );
  return {
    data,
    loading,
    title: contentConfig?.title,
    emptyText: contentConfig?.emptyText,
    endpoint: contentConfig?.update,
    update: contentConfig?.update,
    add: contentConfig?.add,
    route: contentConfig?.route,
    setRefetchData,
    hasTitle: contentConfig?.hasTitle,
    hasDes: contentConfig?.hasDes,
    hasImage: contentConfig?.hasImage,
    message_create: contentConfig?.message_create,
    message_update: contentConfig?.message_update,
  };
};
