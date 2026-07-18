import React, { useEffect } from "react";
import Page_Header from "../../components/layout/header/Main_Header";
import Empty from "../../components/shared/Empty";

import usePaginatedData from "../../hooks/usePaginatedData";
import { API } from "../../service/apiUrl";

import Spinner from "../../components/shared/loaders/Spinner";
import Notification_Item from "./Notification_Item";

const Notification = () => {
  const { data, setData, page, loading, hasMore, handleScroll } =
    usePaginatedData(API.notification.list, "scroll");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);
  return (
    <section className=" main_grid">
      <Page_Header />
      <div className="page main_p">
        {loading && page === 1 ? (
          <div className="flex_center h-[72vh]">
            <Spinner />
          </div>
        ) : data?.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {data?.map((item) => (
              <Notification_Item item={item} key={item?.id} setData={setData} />
            ))}
            {loading && page > 1 && (
              <div className="flex_center ">
                <Spinner />
              </div>
            )}
          </ul>
        ) : (
          <div className=" main_p">
            <Empty className="!h-[62vh]" emptyText="no_notification_yet" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Notification;
