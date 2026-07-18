import React from "react";
import { useTranslation } from "react-i18next";
import { CancellIcon, CheckIcon } from "../../../assets/icons/Icon";
import Button from "../button/Button";

const Status_Card = ({ status, icon, message, onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center text-center gap-4">
      {status ? (
        status === "success" ? (
          <CheckIcon width="80" height="80" />
        ) : (
          <CancellIcon />
        )
      ) : (
        icon
      )}

      {message && (
        <p className="title_lg text-secondary-dark font-semibold ">
          {t(message)}
        </p>
      )}
      <Button onClick={onClose} hasFullWidth>
        {t("okay")}
      </Button>
    </div>
  );
};

export default Status_Card;
