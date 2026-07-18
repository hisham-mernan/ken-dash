import React from "react";
import { Dialog } from "primereact/dialog";

import { useTranslation } from "react-i18next";
import { CloseIcon } from "../../../assets/icons/Icon";
const Modal = ({
  open,
  onClose,
  children,
  className = "",
  title = "",
  disabled,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      visible={open}
      onHide={onClose}
      dismissableMask
      draggable={false}
      className={`${className} max-w-[95%] w-[500px] modal rounded-2xl`}
      header={
        <header className="flex justify-between px-6 py-3">
          <h1 className="text-secondary-dark text-lg font-bold">{t(title)}</h1>
          <span
            role="button"
            onClick={onClose}
            className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
          >
            <CloseIcon />
          </span>
        </header>
      }
    >
      {children}
    </Dialog>
  );
};
export default Modal;
