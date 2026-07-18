import React from "react";
import { API } from "../../../../service/apiUrl";
import useGetData from "../../../../hooks/useGetData";
import { currentLanguageCode } from "../../../../utils/switchLang";
import Website_Header from "../component/Website_Header";
import Spinner from "../../../../components/shared/loaders/Spinner";
import Website_Item from "../component/Website_Item";
import Empty from "../../../../components/shared/Empty";

const Terms_Description = () => {
  const { data, loading } = useGetData(
    API.admin.website.terms_and_conditions.overview.main
  );
  const formatData = [
    {
      value: currentLanguageCode === "en" ? data?.title : data?.title_ar,
    },
  ];
  const isEmpty = data?.detail?.length === 0;
  return (
    <div className="flex flex-col gap-7">
      <Website_Header
        title="terms_description"
        editPath={
          isEmpty
            ? `/admin/website/terms-and-conditions/overview/create`
            : `/admin/website/terms-and-conditions/overview/${data?.id}/edit`
        }
        hasEditIcon={isEmpty ? false : true}
      />
      {loading ? (
        <div className="flex justify-center h-[48vh]">
          <Spinner />
        </div>
      ) : !isEmpty ? (
        formatData?.map((item) => <Website_Item key={item?.id} data={item} />)
      ) : (
        <Empty emptyText="no_terms_overview_yet" />
      )}
    </div>
  );
};

export default Terms_Description;
