import { useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "./../../../service/axiosInstance";
import { toast } from "react-toastify";
import { handleErrors } from "../../../utils/handleError";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { EditIcon, TrashIcon } from "../../../assets/icons/Icon";
import Confirmation_Modal from "../modal/Confirmation_Modal";

const Action = ({
  hasDelete = false,
  disabled = false,
  viewPath,
  hasConfirmPopup = true,
  handleDeleteActionWithConfirmPopup,
  deleteMessage = "",
  children,
  deleteLink,
  refetchFn,
  customDeleteFn,
  customLoading,
  state,
}) => {
  const { t } = useTranslation();
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(deleteLink);
      if (response.status === 204) {
        setVisibility(false);
        toast.success(t("Successfully_deleted"));
        if (refetchFn) {
          refetchFn();
        }
      }
    } catch (err) {
      handleErrors(err, t);
      setVisibility(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`flex_center_y gap-3 md:gap-6`}>
        {viewPath && (
          <Button
            to={viewPath}
            type="light"
            hasFullWidth={false}
            size="xs"
            className="!w-[28px] !p-0"
            iconLeft={<EditIcon width="16" height="16" />}
            state={state}
          />
        )}
        {hasDelete && (
          <Button
            type="error_outline"
            size="xs"
            className="!w-[28px] !p-0 !gap-0"
            onClick={() => {
              if (!disabled) {
                if (hasConfirmPopup) {
                  setVisibility(true);
                } else {
                  handleDeleteActionWithConfirmPopup();
                }
              }
            }}
            iconLeft={<TrashIcon />}
          />
        )}
        {children}
      </div>
      <Confirmation_Modal
        open={visibility}
        disabled={customDeleteFn ? customLoading : loading}
        onClose={() => {
          if (!loading) {
            setVisibility(false);
          }
        }}
        deleteMessage={deleteMessage}
        handleClick={
          customDeleteFn ? () => customDeleteFn(setVisibility) : handleDelete
        }
      />
    </>
  );
};

export default Action;
