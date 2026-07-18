import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Input_Calendar from "./Input_Calendar";

import { Checkbox } from "primereact/checkbox";
import Upload_Images from "./Upload_Images";
import { Dropdown } from "primereact/dropdown";
import Map from "../map/Map";
import Button from "../button/Button";
import { TrashIcon } from "../../../assets/icons/Icon";
import { MultiSelect } from "primereact/multiselect";
import Input_Editor from "./Input_Editor";
import Icon_Dropdown from "./Icon_Dropdown";
import { Skeleton } from "primereact/skeleton";

const Form = ({
  formList = [],
  control,
  setError,
  errors,
  loading,
  dataLoader,

  viewOnly = false,
}) => {
  const { t } = useTranslation();

  const renderField = (item, field, t, error) => {
    switch (item?.formType) {
      case "input":
        return (
          <section className={item?.showInlineError ? "grid gap-2" : ""}>
            <div
              className={`flex input gap-4 ${
                item?.disabled || loading ? "disabled" : ""
              }  ${
                !viewOnly &&
                (error?.message || errors?.[item?.fieldName]?.message)
                  ? "!border-red-dark"
                  : ""
              } focus-within:!border-secondary-light`}
            >
              {item?.icon && <span className="flex_center">{item.icon}</span>}
              <input
                id={item?.id}
                name={item?.name}
                type={item?.type}
                inputMode={item?.inputMode || "none"}
                onChange={(e) => {
                  if (!viewOnly) {
                    field?.onChange(e);
                  }
                }}
                value={viewOnly ? item?.value : field?.value}
                disabled={item?.disabled || loading}
                placeholder={t(item?.placeholder || "")}
                className={`flex-1 ${
                  viewOnly ? "placeholder:!text-secondary-dark" : ""
                }  `}
                min={0}
                onWheel={(e) => e.target.blur()}
                onKeyDown={item?.onKeyDown}
                onInput={(e) => {
                  if (!viewOnly) {
                    item?.onInput?.(e, field);
                  }
                }}
              />
            </div>
            {item?.showInlineError && (
              <p className="text-red-dark text-xs">{t(error?.message)}</p>
            )}
          </section>
        );
      case "dropdown":
        return (
          <section className={item?.showInlineError ? "grid gap-2" : ""}>
            <div
              className={`flex input gap-4 transparent_dropdown overflow-hidden ${
                item?.disabled || loading ? "disabled" : ""
              }  ${
                !viewOnly &&
                (error?.message || errors?.[item?.fieldName]?.message)
                  ? "!border-red-dark"
                  : ""
              } focus-within:!border-secondary-light`}
            >
              {item?.icon && <span className="flex_center">{item.icon}</span>}
              <Dropdown
                options={item?.optionList}
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
                optionLabel="name"
                inputId={item?.id}
                filter={item?.hasFilter || false}
                loading={item?.loading ? true : false}
              />
            </div>
            {item?.showInlineError && (
              <p className="text-red-dark text-xs">{t(error?.message)}</p>
            )}
          </section>
        );
      case "icon":
        return (
          <Icon_Dropdown
            error={error?.message || errors?.[item?.fieldName]?.message}
            item={item}
            viewOnly={viewOnly}
            loading={loading}
            handleChange={(e) => {
              field.onChange(e);
            }}
            field={field}
          />
        );
      case "multiselect":
        return (
          <MultiSelect
            options={item?.optionList}
            value={field?.value}
            onChange={(e) => {
              field?.onChange(e);
            }}
            disabled={item?.disabled || loading}
            placeholder={t(item?.placeholder || "")}
            className={`flex-1 w-full !p-0 ${
              item?.disabled || loading ? "disabled_input" : ""
            } ${error ? "input_error" : ""} ${item?.icon ? "icon" : ""} `}
            optionLabel="name"
            inputId={item?.id}
            filter={item?.hasFilter || false}
            maxSelectedLabels={2}
          />
        );
      case "phone_number":
        return (
          <div
            dir="ltr"
            className={`flex input gap-4 ${
              item?.disabled || loading ? "disabled" : ""
            }  ${
              !viewOnly &&
              (error?.message || errors?.[item?.fieldName]?.message)
                ? "!border-red-dark"
                : ""
            } focus-within:!border-secondary-light`}
          >
            <span className="text-black">+966</span>
            <input
              id={item?.id}
              name={item?.name}
              type="tel"
              onChange={(e) => {
                if (!viewOnly) {
                  field?.onChange(e);
                }
              }}
              value={viewOnly ? item?.value : field?.value}
              disabled={item?.disabled || loading}
              placeholder={t(item?.placeholder || "")}
              className={`flex-1   ${
                viewOnly ? "placeholder:!text-secondary-dark" : ""
              }  `}
              min={0}
              onWheel={(e) => e.target.blur()}
              onInput={(e) => {
                if (!viewOnly) {
                  item?.onInput?.(e, field);
                }
              }}
            />
          </div>
        );
      case "calendar":
        return (
          <section className={item?.showInlineError ? "grid gap-2" : ""}>
            <Input_Calendar
              id={item?.id}
              label={item?.label}
              error={
                viewOnly
                  ? false
                  : error?.message || errors?.[item.fieldName]?.message
              }
              handleChange={(e) => {
                if (!viewOnly) {
                  field.onChange(e.value);
                }
              }}
              value={viewOnly ? item?.value : field.value}
              placeholder={item?.placeholder}
              hasRequiredStar={item.hasRequiredStar}
              disabled={item?.disabled || loading}
              loading={dataLoader}
              viewOnly={viewOnly}
              icon={item?.icon}
            />
            {item?.showInlineError && (
              <p className="text-red-dark text-xs">{t(error?.message)}</p>
            )}
          </section>
        );

      case "textarea":
        return (
          <div
            className={`flex !items-start input !h-[126px] gap-4 ${
              item?.textareaClassName
            } ${item?.disabled || loading ? "disabled" : ""}  ${
              !viewOnly &&
              (error?.message || errors?.[item?.fieldName]?.message)
                ? "!border-red-dark"
                : ""
            } focus-within:!border-secondary-light`}
          >
            {item?.icon && <span className="flex_center">{item.icon}</span>}
            <textarea
              id={item?.id}
              name={item?.name}
              type={item?.type}
              onChange={(e) => {
                if (!viewOnly) {
                  field?.onChange(e);
                }
              }}
              value={viewOnly ? item?.value : field?.value}
              disabled={item?.disabled || loading}
              placeholder={t(item?.placeholder || "")}
              className={`flex-1 text-sm h-full resize-none  outline-none shadow-none  ${
                viewOnly ? "placeholder:!text-secondary-dark" : ""
              }  `}
              min={0}
              onWheel={(e) => e.target.blur()}
              onInput={(e) => {
                if (!viewOnly) {
                  item?.onInput?.(e, field);
                }
              }}
            />
          </div>
        );
      case "checkbox":
        return (
          <div className="flex_center_y gap-2">
            <Checkbox
              onChange={(e) => {
                if (!viewOnly) {
                  field?.onChange(e);
                }
              }}
              checked={field?.value}
              disabled={loading}
              inputId="terms_and_condition"
              invalid={
                viewOnly
                  ? false
                  : error || errors?.[item.fieldName]
                  ? true
                  : false
              }
            ></Checkbox>
            <label
              htmlFor="terms_and_condition"
              className="text-primary-4 font-normal flex_center_y gap-1 capitalize text-base  lg:text-lg"
            >
              {item?.label}
            </label>
          </div>
        );
      case "upload":
        return (
          <Upload_Images
            error={error?.message || errors?.[item.fieldName]?.message}
            handleChange={(e) => {
              field.onChange(e);
            }}
            value={field.value}
            field={item?.fieldName}
            setError={setError}
            disabled={item?.disabled || loading}
            item={item}
          />
        );
      case "editor":
        return (
          <Input_Editor
            id={item?.id}
            name={item?.name}
            handleChange={(e) => {
              field.onChange(e.htmlValue);
            }}
            value={field?.value || item?.value}
            disabled={item?.disabled || loading}
            placeholder={t(item?.placeholder || "")}
            item={item}
            error={error?.message || errors?.[item.fieldName]?.message}
          />
        );
      case "map":
        return (
          <Map
            value={field?.value}
            onChangeMap={field.onChange}
            markerPosition={item?.markerPosition}
            onlyForShow={item?.onlyForShow}
            haveDetectLocation={item?.haveDetectLocation}
            item={item}
            disabled={item?.disabled || loading}
            loading={item?.loading || loading}
            error={error?.message || errors?.[item.fieldName]?.message}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {formList?.map((item) =>
        dataLoader ? (
          <section
            className={`grid gap-2 content-baseline ${item?.className || ""}`}
          >
            <Skeleton width="100px" />
            <Skeleton className=" w-full !h-[45px] lg:!h-[57px]" />
          </section>
        ) : (
          item && (
            <fieldset
              key={item?.id}
              className={`grid gap-2 content-baseline ${item?.className || ""}`}
            >
              {item?.seprator && (
                <div className="w-full mb-3 h-[.5px] border border-dashed border-[#c8c8c8a9]" />
              )}
              {(item?.label || item?.hasDelete) && (
                <div
                  className={
                    item?.hasDelete ? "flex_center_y justify-end gap-2" : ""
                  }
                >
                  {item?.label && (
                    <label
                      htmlFor={item.id}
                      className={`flex-1 flex items-center gap-1 text-base text-[#5D5D5D] font-normal  capitalize ${
                        item?.labelClassName ?? ""
                      } `}
                    >
                      {item?.hasRequiredStar && (
                        <span className=" text-secondary font-base">*</span>
                      )}
                      <span
                        className={` ${item?.labelClassName ?? "body_lg"} `}
                      >
                        {t(item?.label)}
                      </span>
                    </label>
                  )}
                  {item?.hasDelete && (
                    <Button
                      type="error_outline"
                      size="xs"
                      className="!w-[28px] !p-0 !gap-0"
                      onClick={() => {
                        if (item?.onDelete) {
                          item?.onDelete();
                        }
                      }}
                      iconLeft={<TrashIcon />}
                    />
                  )}
                </div>
              )}
              {item?.formType !== "label_groups" && item && (
                <>
                  <Controller
                    name={item?.fieldName}
                    control={control}
                    rules={item?.validator}
                    render={({ field, fieldState: { error } }) =>
                      renderField(item, field, t, error)
                    }
                  />
                  {/* Info Text */}
                  {item?.info && !errors[item?.fieldName]?.message && (
                    <div
                      className=" text-[#4F4F4F] headline_sm !font-normal text-center  max-w-[429px] "
                      dangerouslySetInnerHTML={{ __html: t(item?.des) }}
                    />
                  )}
                  {/* Error Text */}

                  {errors[item?.fieldName] && (
                    <p className="text-red-dark text-xs">
                      {t(errors[item?.fieldName]?.message)}
                    </p>
                  )}
                </>
              )}
            </fieldset>
          )
        )
      )}
    </>
  );
};

export default Form;
