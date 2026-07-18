import React from "react";

// lib
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { currentLanguageCode } from "../../../utils/switchLang";
import Empty from "../Empty";

const Table = ({
  columns,
  data,
  loading,
  tbodyClassName = "",
  thClassName = "",
  emptyText = "",
  rowAction,
}) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <table className="w-full border-collapse">
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="border-b border-[#F5F5F6]">
                {columns?.map((_, columnIndex) => (
                  <td
                    key={columnIndex}
                    className={`${tbodyClassName} text-nowrap text-center bg-white py-5 px-4 min-w-12`}
                  >
                    <Skeleton height={16} borderRadius={50} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <DataTable
          value={data}
          tableStyle={{ width: "100%" }}
          emptyMessage={<Empty className="!h-[20vh] " emptyText={emptyText} />}
          onRowClick={(e) => {
            const row = e.data;

            if (rowAction) {
              rowAction(row, e);
            }
          }}
        >
          {columns?.map(
            (item, index) =>
              item && (
                <Column
                  dir={currentLanguageCode === "en" ? "ltr" : "rtl"}
                  key={index}
                  field={item.field}
                  header={t(item.header)}
                  body={item?.body}
                />
              )
          )}
        </DataTable>
      )}
    </div>
  );
};

export default Table;
