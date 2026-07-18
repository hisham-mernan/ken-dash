import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import Form from "../form/Form";
import { LinearRoutingIcon } from "../../../assets/icons/Icon";

const Includes_Section = ({
  title,
  label,
  type,
  services,
  fields,
  removeFn,
  appendFn,
  handleAddAnother,
  iconList,
  control,
  setError,
  errors,
  loading,
  dataLoader,
}) => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-[#5D5D5D] font-semibold title_xl ">{title}</h2>
      <div className="flex flex-col gap-6">
        {fields.map((item, idx) => {
          const formList = [
            {
              id: 0,
              formType: "label_groups",
              label: `${label} ${idx + 1}`,
              hasRequiredStar: true,
              className: "2xl:col-span-3 col-span-1",
              hasDelete: services.length > 1,
              onDelete: () => removeFn(idx),
            },
            {
              id: 1,
              formType: "icon",
              fieldName: `${type}[${idx}].icon_id`,
              placeholder: "category_icon",
              icon: <LinearRoutingIcon />,
              validator: { required: "required_field" },
              optionList: iconList?.map((item) => ({
                image: item?.image,
                id: item?.id,
              })),
              showInlineError: true,
              hasRequiredStar: true,
            },
            {
              id: 2,
              formType: "input",
              fieldName: `${type}[${idx}].description`,
              name: "service_description",
              type: "text",
              placeholder: "service_description",
              validator: {
                required: "required_field",
                maxLength: {
                  value: 250,
                  message: `${t("max_length_error", { length: 250 })} `,
                },
              },
              showInlineError: true,
              hasRequiredStar: true,
            },
            {
              id: 3,
              formType: "input",
              fieldName: `${type}[${idx}].description_ar`,
              name: "service_description_ar",
              type: "text",
              placeholder: "service_description_ar",
              validator: {
                required: "required_field",
                maxLength: {
                  value: 250,
                  message: `${t("max_length_error", { length: 250 })} `,
                },
              },
              showInlineError: true,
              hasRequiredStar: true,
            },
          ];

          return (
            <fieldset
              key={item.id}
              className="grid gap-y-4 gap-x-3 grid-cols-1 2xl:grid-cols-[217px_1fr_1fr]"
            >
              <Form
                formList={formList}
                control={control}
                errors={errors}
                setError={setError}
                loading={loading}
                dataLoader={dataLoader}
              />
            </fieldset>
          );
        })}
      </div>
      <Button
        hasFullWidth
        type="dotted"
        textSize="lg"
        onClick={() =>
          handleAddAnother(type, services, appendFn, type === "extra_services")
        }
      >
        {t("add_another_service")}
      </Button>
    </section>
  );
};

export default Includes_Section;
