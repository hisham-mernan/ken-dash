import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { TrashIcon } from "../../../assets/icons/Icon";
const maxFileSizeInMB = import.meta.env.VITE_REACT_APP_IMAGE_SIZE;
const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;
const Upload_Images = ({
  field,
  setError,
  error,
  handleChange,
  value,
  validTypes = ["image/jpeg", "image/png", "image/jpg"],
  disabled,
  item,
}) => {
  const { t } = useTranslation();
  const [img, setImg] = useState(value || null);

  const isMultiple = item?.isMultiple ? true : false;
  const limit = item?.limit || 10;

  const handleFileChange = (newFiles, e) => {
    if (isMultiple) {
      const files = Array.from(newFiles);
      const existingImages = value || [];
      const emptySlots = limit - existingImages.length;
      if (emptySlots <= 0) {
        toast.error(t("only_upload_images", { limit }));
        return;
      }

      if (files.length > emptySlots) {
        toast.info(
          t("you_selected_but_we_accept", {
            length: files.length,
            emptySlots: emptySlots,
          })
        );
      }
      const filesToProcess = files.slice(0, emptySlots);
      const newImages = [];

      filesToProcess.forEach((file, idx) => {
        if (!validTypes.includes(file.type)) {
          toast.error(t("error_image_type"));
          return;
        }

        // Validate size
        if (file.size > maxFileSizeInBytes) {
          toast.error(
            `${file.name} - ${t("exceed_limit")} ${maxFileSizeInMB} MB`
          );
          return;
        }

        // truncate name
        const fileNameParts = file.name.split(".");
        const ext = fileNameParts.pop();
        const baseName = fileNameParts.join(".");
        const truncatedName =
          file.name.length > 100
            ? `${baseName.substring(0, 10)}.${ext}`
            : file.name;

        const finalFile = new File([file], truncatedName, { type: file.type });

        newImages.push({
          id: `${Date.now()}-${idx}`,
          image: finalFile,
          preview: URL.createObjectURL(finalFile),
        });
      });

      const updatedImages = [...existingImages];

      let newImgIdx = 0;
      for (
        let i = 0;
        i < updatedImages.length && newImgIdx < newImages.length;
        i++
      ) {
        if (!updatedImages[i]?.image) {
          updatedImages[i] = newImages[newImgIdx++];
        }
      }

      while (newImgIdx < newImages.length) {
        updatedImages.push(newImages[newImgIdx++]);
      }

      setImg(updatedImages);
      handleChange(updatedImages);
    } else {
      let file = newFiles[0];
      if (!validTypes.includes(file.type)) {
        toast.error(t("error_image_type"));
        setError(field, {
          type: "manual",
          message: "error_image_type",
        });
        return;
      }
      if (file.size > maxFileSizeInBytes) {
        toast.error(
          `${file?.name} - ${t("exceed_limit")} ${maxFileSizeInMB} MB`
        );
        setError(field, {
          type: "manual",
          message: `${file?.name} - ${t("exceed_limit")} ${maxFileSizeInMB} MB`,
        });
        return;
      }
      setImg(URL?.createObjectURL(file));
      handleChange(file);
    }
    e.target.value = null;
  };

  const handleRemove = (key, type) => {
    if (isMultiple) {
      if (!Array.isArray(value)) {
        setImg(null);
        handleChange(null);
        return;
      }

      const updated = value.filter((item, idx) => {
        const itemId = item?.id ?? idx;
        console.log(type, "kkk");
        if (item?.id && itemId === key && type === "id") {
          if (item?.setListDeleteImages) {
            item?.setListDeleteImages((pre) => [...pre, item?.id]);
          }
        }
        return itemId !== key;
      });

      setImg(updated);
      handleChange(updated);
    } else {
      if (item?.action) {
        item?.action();
      }
      setImg(null);
      handleChange(null);
    }
  };

  useEffect(() => {
    if (value && item?.isEdit) {
      setImg(value);
    }
  }, [value]);
  return (
    <section className="flex flex-col gap-3">
      {/* upload image button */}
      <label
        htmlFor={item?.id}
        className={` ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } rounded-xl h-[45px] lg:h-[57px]  flex_center border border-dashed ${
          error ? "border-red-dark" : "border-[#C8C8C8]"
        }   w-full body_lg text-[#BBBEBD] font-light`}
      >
        {t(item?.imageTitle ?? "upload")}
      </label>
      {img &&
        (isMultiple && Array.isArray(img) ? (
          img.length > 0 && (
            <div className="flex items-center flex-wrap gap-3">
              {img.map((i, idx) => (
                <Image_Item
                  key={i?.id}
                  value={i?.preview ?? i?.image}
                  item={i}
                  index={idx}
                  onRemove={() => {
                    handleRemove(
                      i?.id ?? idx,
                      i?.image instanceof File ? "file" : "id"
                    );
                  }}
                  disabled={disabled}
                />
              ))}
            </div>
          )
        ) : (
          <Image_Item value={img} onRemove={handleRemove} />
        ))}

      <input
        id={item?.id}
        type="file"
        accept=".jpg,.png,.jpeg"
        multiple={isMultiple}
        onChange={(e) => handleFileChange(e.target.files, e)}
        className="hidden"
        disabled={disabled}
      />
      {item?.showInlineError && (
        <p className="text-red-dark text-xs">{t(error?.message)}</p>
      )}
    </section>
  );
};
const Image_Item = ({ value, onRemove, disabled }) => {
  return (
    <div className="group relative w-[60px] h-[60px]">
      <img
        alt="image"
        src={typeof value === "string" ? value : URL?.createObjectURL(value)}
        className="w-full h-full object-cover rounded-xl"
      />{" "}
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 opacity-0 ${
          disabled ? "hidden" : "group-hover:opacity-100"
        } transition-opacity duration-300 flex_center rounded-xl`}
      >
        <span
          onClick={onRemove}
          className={` cursor-pointer  flex_center w-12 h-12 rounded-xl p-3 ${
            disabled ? "hidden" : ""
          }`}
        >
          <TrashIcon width="24" height="24" fill="white" />
        </span>
      </div>
    </div>
  );
};
export default Upload_Images;
