import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import Modal from "./Modal";

const Confirmation_Modal = ({
  open,
  onClose,
  loading,
  deleteMessage,
  deleteText,
  handleClick,
}) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} disabled={loading} onClose={onClose}>
      <section className="flex flex-col gap-7">
        <p className="text-secondary-dark font-semibold text-lg">
          {deleteMessage
            ? `${t("are_you_sure_you_want")} ${deleteMessage}?`
            : t(deleteText)}
        </p>
        <footer className="flex_center_y gap-2.5 justify-between">
          <Button
            type="secondary"
            size="lg"
            onClick={onClose}
            className="!w-1/3"
            disabled={loading}
          >
            {t("no")}
          </Button>
          <Button
            onClick={handleClick}
            className="!w-2/3"
            size="lg"
            loading={loading}
          >
            {t("yes")}
          </Button>
        </footer>
      </section>
    </Modal>
  );
};

export default Confirmation_Modal;
