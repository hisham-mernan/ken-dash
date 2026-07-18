export const getStateBadgeType = (state) => {
  const stateMap = {
    cancelled: "error",
    pending: "warning",
    delivered: "success",
  };
  return stateMap[state];
};
export const getOrderBadgeType = (state) => {
  const stateMap = {
    cancelled: "error",
    pending: "warning",
    paid: "success",
    refuned: "blue",
  };
  return stateMap[state];
};
export const getQrStatusBadge = (state) => {
  const stateMap = {
    not_started: "disabled",
    not_valid: "error",
    scaned: "success",
  };
  return stateMap[state];
};
