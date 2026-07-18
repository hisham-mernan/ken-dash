import React from "react";
import Pagination from "./Pagination";
import { useTranslation } from "react-i18next";
import Table from "./Table";
import Filter from "./Filter";

const Table_Container = ({
  handlePagination,
  style = "default",
  hasPagination = true,
  hasFilter = true,
  title,
  data,
  loading,
  columns,
  query,
  setQuery,
  searchPlaceholder,
  searchKey,
  children,
  emptyText,
  page,
  pages,
  filterList = [],
}) => {
  const { t } = useTranslation();
  const onPageChange = (pageNumber) => {
    handlePagination(pageNumber);
  };
  const base = "page p-4";
  const styles = {
    default: `${base} rounded-xl sm:rounded-2xl grid gap-4 `,
  };

  return (
    <div className={`${styles[style]}  `}>
      {title && (
        <h3 className="text-text-primary text-lg font-semibold">{t(title)}</h3>
      )}
      {hasFilter && (
        <Filter
          searchKey={searchKey}
          query={query}
          setQuery={setQuery}
          searchPlaceholder={searchPlaceholder}
          filterList={filterList}
        />
      )}
      {children}
      <Table
        columns={columns}
        data={data}
        loading={loading}
        emptyText={emptyText}
      />

      {hasPagination && (
        <Pagination
          currentPage={page}
          totalCount={pages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Table_Container;
