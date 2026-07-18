import { toast } from "react-toastify";

export const handleErrors = (err, t, setError) => {
  if (!err || !err.response || !err.response.data) {
    toast.error(t("unexpected_error"));
    return "unexpected_error";
  }

  const data = err.response.data;

  if (typeof data === "string" && data.includes("<!DOCTYPE html>")) {
    toast.error(t("unexpected_error"));
    return "unexpected_error";
  }

  const detail =
    data.detail ||
    data.message ||
    data.error ||
    data?.email?.at(0) ||
    data?.id_num?.at(0) ||
    data?.phone?.at(0);

  switch (detail) {
    case "No User matches the given query.":
      toast.error(t("user_not_found"));
      break;
    case "No Order matches the given query.":
      toast.error(t("order_not_found"));
      break;
    case "You do not have permission to perform this action.":
      toast.error(t("not_allow_to_preform_action"));
      break;
    case "Email is already in use.":
      toast.error(t("email_already_exist"));
      setError("email", {
        type: "manual",
        message: "email_already_exist",
      });
      break;
    case " id_num  is already  exsit":
      toast.error(t("national_id_exist"));
      setError("id_num", {
        type: "manual",
        message: "national_id_exist",
      });
      break;
    case "Phone number is already in use.":
      toast.error(t("phone_numbe_already_exist"));
      setError("phone", {
        type: "manual",
        message: "phone_numbe_already_exist",
      });
      break;
    case "Only cancelled bookings can be refused":
      toast.error(t("only_cancelled_can_be_refused"));
      break;
    case "No AboutUs matches the given query.":
      toast.error(t("no_about_us_matches"));
      break;
    case "No Services matches the given query.":
      toast.error(t("no_matching_services"));
      break;
    case "No KenSpecialItems matches the given query.":
      toast.error(t("no_matching_product"));
      break;
    case "No Event matches the given query.":
      toast.error(t("no_matching_event"));
      break;
    case "No Hut matches the given query.":
      toast.error(t("no_matching_hut"));
      break;
    case "Booking is not valid for scanning today.":
      toast.error(t("booking_not_valid_today"));
      break;
    default:
      toast.error(t("unexpected_error"));
  }
};
