import React from "react";

import Website_Header from "../component/Website_Header";
import Spinner from "../../../../components/shared/loaders/Spinner";
import Website_Item from "../component/Website_Item";
import Empty from "../../../../components/shared/Empty";
import { useContent } from "../../../../hooks/useContent";

const Content_Management = () => {
  const { title, loading, data, emptyText, route, endpoint, setRefetchData } =
    useContent();

  return (
    <div className="flex flex-col gap-7">
      <Website_Header title={title} editPath={`${route}create`} />
      {loading ? (
        <div className="flex justify-center h-[48vh]">
          <Spinner />
        </div>
      ) : data?.length > 0 ? (
        data?.map((item) => (
          <Website_Item
            key={item?.id}
            data={item}
            viewPath={`${route}${item?.id}/edit`}
            hasDelete={true}
            deleteLink={`${endpoint}${item?.id}/`}
            refetchFn={() => setRefetchData(Date.now())}
            deleteMessage=" "
          />
        ))
      ) : (
        <Empty emptyText={emptyText} />
      )}
    </div>
  );
};

export default Content_Management;
