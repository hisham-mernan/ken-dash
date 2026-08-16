import React from "react";
import { useTranslation } from "react-i18next";

import Action from "../../../../components/shared/table/Action";
import { getImageUrl, IMG } from "../../../../utils/getImageUrl";

const Website_Item = ({
  data,
  hasDelete,
  viewPath,
  deleteMessage,
  deleteLink,
  refetchFn,
}) => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col sm:flex-row justify-between items-center gap-2">
      <div
        className={`flex-1 flex flex-col sm:flex-row gap-3 items-center   w-full max-w-[822px]`}
      >
        {data?.image && (
          <img loading="lazy" decoding="async"
            src={getImageUrl(data?.image, { width: IMG.thumb })}
            alt={data?.title}
            className="w-full h-[200px] sm:w-[60px] sm:h-[60px] object-cover rounded-lg"
          />
        )}
        <figcaption className="flex-1 flex flex-col gap-1">
          <h3 className="title_lg text-[#0A1F1A] font-normal  ">
            {t(data?.title)}
          </h3>
          {data?.value && (
            <p
              className="text-[#6E6E6E] body_lg line-clamp-6 "
              dangerouslySetInnerHTML={{ __html: data?.value }}
            />
          )}
        </figcaption>
      </div>
      <div className=" ms-auto">
        <Action
          hasDelete={hasDelete}
          viewPath={viewPath}
          deleteMessage={deleteMessage}
          deleteLink={deleteLink}
          refetchFn={refetchFn}
        />
      </div>
    </section>
  );
};

export default Website_Item;
