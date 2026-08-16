import { Dropdown } from "primereact/dropdown";
import React from "react";
import { useTranslation } from "react-i18next";
import { getImageUrl, IMG } from "../../../utils/getImageUrl";

const Icon_Dropdown = ({ item, error, loading, viewOnly, field }) => {
  const { t } = useTranslation();
  const itemTemplate = (option) => {
    if (!option || !option.image) {
      return (
        <span className="text-gray-400">
          {t(item?.placeholder || "Select an icon")}
        </span>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <img loading="lazy" decoding="async"
          src={getImageUrl(option.image, { width: IMG.icon })}
          alt={`Icon `}
          className="w-5 h-5 object-contain"
        />
      </div>
    );
  };

  return (
    <section className={item?.showInlineError ? "grid gap-2" : ""}>
      <div
        className={`flex input gap-4 transparent_dropdown icon overflow-hidden ${
          item?.disabled || loading ? "disabled" : ""
        }  ${
          !viewOnly && error ? "!border-red-dark" : ""
        } focus-within:!border-secondary-light`}
      >
        {item?.icon && <span className="flex_center">{item.icon}</span>}
        <Dropdown
          options={item?.optionList}
          optionLabel="image"
          optionValue="id"
          valueTemplate={itemTemplate}
          itemTemplate={itemTemplate}
          value={field?.value}
          onChange={(e) => {
            if (item?.action && item?.fieldName) {
              item?.action(e?.value);
            }
            field?.onChange(e);
          }}
          disabled={item?.disabled || loading || item?.loading}
          placeholder={t(item?.placeholder || "")}
          className={`flex-1 w-full !p-0 form_dropdown ${
            error ? "input_error" : ""
          } `}
          inputId={item?.id}
          filter={item?.hasFilter || false}
          loading={item?.loading ? true : false}
          panelClassName="horizontal-icon-dropdown"
        />
      </div>
      {item?.showInlineError && (
        <p className="text-red-dark text-xs">{t(error)}</p>
      )}
    </section>
  );
};

export default Icon_Dropdown;
