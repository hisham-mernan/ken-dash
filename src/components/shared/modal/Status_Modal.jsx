import React from "react";
import Modal from "./Modal";
import Status_Card from "./Status_Card";

const Status_Modal = ({
  open,
  onClose,
  status = "success",
  loading,
  icon,
  message,
}) => {
  return (
    <Modal open={open} disabled={loading} onClose={onClose}>
      <Status_Card
        status={status}
        icon={icon}
        message={message}
        onClose={onClose}
      />
    </Modal>
  );
};

export default Status_Modal;
