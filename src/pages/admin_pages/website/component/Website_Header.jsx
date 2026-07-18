import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/shared/button/Button";
import { AddIcon, EditIcon } from "../../../../assets/icons/Icon";

const Website_Header = ({ title, editPath, hasEditIcon = false }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between gap-1 bg-light p-4 rounded-xl">
      <h3 className=" headline_sm font-semibold flex-1 text-secondary-light">
        {t(title)}
      </h3>
      {editPath && (
        <Button
          type="white"
          to={editPath}
          size="xs"
          className="!w-[28px] !p-0 !border-none"
          iconLeft={hasEditIcon ? <EditIcon /> : <AddIcon />}
        />
      )}
    </div>
  );
};

export default Website_Header;
