import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FilterIcon,
  ReseatIcon,
  SearchIcon,
  SearchIcon2,
} from "../../../assets/icons/Icon";
import Modal from "../modal/Modal";
import Button from "../button/Button";

const Filter = ({
  searchKey,
  query,
  setQuery,
  searchPlaceholder,
  filterList = [],
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [openSubFilter, setOpenSubFilter] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchText, setSearchText] = useState("");

  const isSearchDisabled =
    (query && Object.keys(query)?.length > 0) || searchText !== "";
  const canRest = query && Object.keys(query)?.length > 0;
  const handleSearch = () => {
    if (!isSearchDisabled) {
      return;
    }
    setQuery((prev) => {
      const current = prev ?? {};
      const updated = { ...current };

      const trimmed = searchText.trim();

      if (trimmed === "") {
        if (!(searchKey in current)) return current;
        delete updated[searchKey];
      } else {
        if (current[searchKey] === trimmed) return current;
        updated[searchKey] = trimmed;
      }

      return updated;
    });
  };

  const applyFilter = () => {
    if (openSubFilter?.field && selectedItem[openSubFilter.field]) {
      setQuery((prev) => ({
        ...prev,
        [openSubFilter.field]: selectedItem[openSubFilter.field],
      }));
    }
    setVisible(false);
    setOpenSubFilter(null);
  };

  const resetFilter = () => {
    if (!canRest) {
      return null;
    }
    setSearchText("");
    setQuery();
    setSelectedItem({});
    setOpenSubFilter(null);
  };

  const handleFilterClick = (item) => {
    if (item?.data?.length) {
      setOpenSubFilter(item);
    }
  };

  const list = openSubFilter ? openSubFilter.data : filterList;

  return (
    <>
      <div className="flex_center_y justify-between gap-2.5 h-[40px]">
        <div className="flex_center border border-[#E3E3E34D] bg-[#FAFAFA] flex-1  sm:py-2 p-2 sm:px-4 gap-2 rounded-sm">
          <span
            className={`${isSearchDisabled ? "cursor-pointer" : ""} w-5 h-5`}
            onClick={handleSearch}
          >
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder={t(searchPlaceholder)}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="outline-none body_sm  placeholder:truncate border-0 shadow-none flex-1  placeholder:text-sm placeholder:text-[#201D2380]"
          />
        </div>

        {filterList.length > 0 && (
          <span
            role="button"
            onClick={resetFilter}
            className={`flex_center ${
              canRest ? "cursor-pointer" : ""
            } border rounded-sm border-[#E3E3E34D] bg-[#FAFAFA] w-8 h-8 sm:w-10 sm:h-10`}
          >
            <ReseatIcon
              fill="var(--color-secondary-3)"
              width="20"
              height="20"
            />
          </span>
        )}

        {filterList.length > 0 && (
          <span
            role="button"
            onClick={() => setVisible(true)}
            className="flex_center cursor-pointer border rounded-sm border-[#E3E3E34D] bg-[#FAFAFA] w-8 h-8 sm:w-10 sm:h-10"
          >
            <FilterIcon />
          </span>
        )}
      </div>

      <Modal
        open={visible}
        onClose={() => {
          setVisible(false);
          setOpenSubFilter(null);
        }}
        title={openSubFilter ? t(openSubFilter.title) : t("filter")}
        className="!w-[460px]"
      >
        <section className="grid gap-6">
          <div className="flex_center_y flex-row flex-wrap gap-3 sm:gap-y-8 sm:gap-x-3">
            {list?.map((item) => (
              <span
                key={item?.id || item?.value}
                role="button"
                className={`flex_center cursor-pointer text-nowrap text-secondary-dark font-bold text-sm px-6 bg-light max-w-1/2 flex-1 h-[32px] rounded-full ${
                  openSubFilter
                    ? selectedItem?.[openSubFilter.field] === item.value
                      ? "border border-secondary-4"
                      : "border-[2px] border-border"
                    : "border-[2px] border-border"
                }`}
                onClick={() => {
                  if (openSubFilter) {
                    setSelectedItem((prev) => ({
                      ...prev,
                      [openSubFilter.field]: item.value,
                    }));
                  } else {
                    handleFilterClick(item);
                  }
                }}
              >
                {t(item.title)}
              </span>
            ))}
          </div>

          {openSubFilter && (
            <Button onClick={applyFilter} hasFullWidth size="lg">
              <SearchIcon2 fill="white" />
              {t("search")}
            </Button>
          )}
        </section>
      </Modal>
    </>
  );
};

export default Filter;
