import { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ totalCount, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = totalCount;

    if (totalPageCount <= 4) {
      return range(1, totalPageCount);
    }

    return [...range(1, 3), DOTS, totalPageCount];
  }, [totalCount, currentPage]);

  return paginationRange;
};
