import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../service/axiosInstance";
import { API } from "../../service/apiUrl";
import { handleErrors } from "../../utils/handleError";
import { LinearRoutingIcon } from "../../assets/icons/Icon";
import Form from "../../components/shared/form/Form";
import Button from "../../components/shared/button/Button";
import Form_Actions_Btn from "../../components/shared/button/Form_Actions_Btn";
import useGetData from "../../hooks/useGetData";
import { toast } from "react-toastify";
import Includes_Section from "../../components/shared/includes/Includes_Section";

const Event_Details = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);

  // hooks
  const { data: iconList } = useGetData(API.list.icons);

  const {
    control,
    setError,
    setValue,
    getValues,
    formState: { errors, isDirty },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      notes: [
        {
          description_ar: "",
          description: "",
        },
      ],
      includes: [
        {
          icon_id: null,
          description: "",
          description_ar: "",
        },
      ],
    },
    mode: "onChange",
  });
  // _________________ for append ________________
  const eventIncludes = watch("includes");
  const notes = watch("notes");

  const {
    fields: eventIncludeList,
    append: appendEventInclude,
    remove: removeEventInclude,
  } = useFieldArray({
    control,
    name: "includes",
  });
  const {
    fields: notesList,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: "notes",
  });

  const handleAddAnother = (type, currentValue) => {
    const lastItem = currentValue[currentValue?.length - 1];
    let hasEmptyField = false;

    // check empty
    Object.entries(lastItem).forEach(([key, value]) => {
      if (!lastItem[key]) {
        hasEmptyField = true;
        setError(`${type}.${currentValue.length - 1}.${key}`, {
          type: "manual",
          message: t("required_field"),
        });
      }
    });

    if (!hasEmptyField) {
      if (type === "includes") {
        appendEventInclude({
          icon_id: null,
          description: "",
          description_ar: "",
        });
      } else {
        appendNote({ description: "", description_ar: "" });
      }
    }
  };
  const handleRemoveField = (type, index) => {
    if (type === "includes") {
      removeEventInclude(index);
    } else {
      removeNote(index);
    }
  };

  //_________________ submit _________________
  const onSubmit = async (data) => {
    if (isDirty) {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          `${API.events.details}${id}/`,
          data
        );

        const isEdit = response.status === 200;
        const message = isEdit
          ? "successfully_update_event_details"
          : "successfully_create_event_details";
        if (response.status === 200 || response.status === 201) {
          toast.success(t(message));
          navigate(`/event/${id}/price-and-date`);
        }
      } catch (err) {
        handleErrors(err, t, setError);
      } finally {
        setLoading(false);
      }
    } else {
      navigate(`/event/${id}/price-and-date`);
    }
  };
  const getDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.get(
        `${API.events.event_details}${id}/`
      );
      const data = response.data;
      console.log(data);
      if (data?.includes?.length > 0) {
        const includes = data?.includes?.map(
          ({ icon, description, description_ar }) => ({
            icon_id: icon?.id,
            description,
            description_ar,
          })
        );

        setValue("includes", includes, { shouldDirty: false });
      }
      if (data?.notes?.length > 0) {
        setValue("notes", data?.notes, { shouldDirty: false });
      }
    } catch (err) {
      handleErrors(err, t, setError);
    } finally {
      setLoadingData(false);
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11">
      {/* start event includes */}

      <Includes_Section
        title={t("event_includes")}
        type="includes"
        label="activity"
        services={eventIncludes}
        fields={eventIncludeList}
        control={control}
        loading={loading}
        dataLoader={loadingData}
        errors={errors}
        setError={setError}
        iconList={iconList}
        appendFn={appendEventInclude}
        handleAddAnother={handleAddAnother}
        removeFn={removeEventInclude}
      />

      {/* notes */}
      <section className="flex flex-col gap-6">
        <h2 className="text-[#5D5D5D] font-semibold title_xl ">{t("notes")}</h2>
        <div className="flex flex-col gap-6">
          {notesList?.map((item, idx) => {
            const formList = [
              {
                id: 0,
                formType: "label_groups",
                className: "lg:col-span-2 col-span-1",
                hasDelete: notes?.length > 1 ? true : false,
                onDelete: () => handleRemoveField("note", idx),
              },
              {
                id: 1,
                formType: "input",
                label: `${t("note")} ${idx + 1}`,
                fieldName: `notes[${idx}].description`,
                name: "note",

                type: "text",
                placeholder: "note",
                validator: {
                  required: "required_field",
                  maxLength: {
                    value: 250,
                    message: `${t("max_length_error", { length: 250 })} `,
                  },
                },
                showInlineError: true,
                hasRequiredStar: true,
                className: "lg:col-span-2 col-span-1 ",
              },
              {
                id: 2,
                formType: "input",
                fieldName: `notes[${idx}][description_ar]`,
                label: "note_ar",
                name: "note_ar",

                type: "text",
                placeholder: "note_ar",
                validator: {
                  required: "required_field",
                  maxLength: {
                    value: 250,
                    message: `${t("max_length_error", { length: 250 })} `,
                  },
                },
                showInlineError: true,
                hasRequiredStar: true,
                className: "lg:col-span-2 col-span-1 ",
              },
            ];
            return (
              <fieldset className="grid  gap-y-4 gap-x-3  grid-cols-1 2xl:grid-cols-2">
                <Form
                  key={item.id}
                  formList={formList}
                  control={control}
                  errors={errors}
                  setError={setError}
                  loading={loading}
                  dataLoader={loadingData}
                />
              </fieldset>
            );
          })}
        </div>
        <Button
          hasFullWidth
          type="dotted"
          textSize="lg"
          onClick={() => handleAddAnother("notes", notes)}
        >
          {t("add_another_event")}
        </Button>
      </section>

      <Form_Actions_Btn
        backBtnCta={() => {
          navigate(`/event/${id}/about`);
        }}
        mainBtnName="next"
        loading={loading}
      />
    </form>
  );
};

export default Event_Details;
