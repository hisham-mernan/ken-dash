import React from "react";
import useGetData from "../../../../hooks/useGetData";
import { API } from "../../../../service/apiUrl";
import { useTranslation } from "react-i18next";
import { EditIcon } from "../../../../assets/icons/Icon";
import Button from "../../../../components/shared/button/Button";
import Website_Header from "../component/Website_Header";
import About_Crud from "./About_Crud";
import Website_Item from "../component/Website_Item";
import { currentLanguageCode } from "../../../../utils/switchLang";
import Empty from "../../../../components/shared/Empty";
import Spinner from "../../../../components/shared/loaders/Spinner";

const About = () => {
  const { t } = useTranslation();
  const { data, loading } = useGetData(API.admin.website.about.about);
  console.log(data);
  const formatData = [
    {
      title: "about_us",
      value:
        currentLanguageCode === "en"
          ? data?.at(0)?.about_us
          : data?.at(0)?.about_us_ar,
    },
    {
      title: "our_mission",
      value:
        currentLanguageCode === "en"
          ? data?.at(0)?.mission
          : data?.at(0)?.mission_ar,
    },
    {
      title: "our_vission",
      value:
        currentLanguageCode === "en"
          ? data?.at(0)?.vission
          : data?.at(0)?.vission_ar,
    },
  ];
  return (
    <div className="flex flex-col gap-7">
      <Website_Header
        title="about_us"
        editPath={
          data?.length > 0
            ? `/admin/website/about/${data?.at(0)?.id}/edit`
            : `/admin/website/about/create`
        }
        hasEditIcon={data?.length === 0 ? false : true}
      />
      {loading ? (
        <div className="flex justify-center h-[48vh]">
          <Spinner />
        </div>
      ) : data?.length > 0 ? (
        formatData?.map((item) => <Website_Item key={item?.id} data={item} />)
      ) : (
        <Empty emptyText="no_about_us" />
      )}
    </div>
  );
};

export default About;
