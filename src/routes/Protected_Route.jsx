import React from "react";
import { useAuth } from "../context/Auth_Context";
import { landingUrl } from "../constant/urls";
import { getUserRole } from "../utils/auth";
const allowedUsers = ["supplier", "admin"];
const Protected_Route = ({ role, children }) => {
  const { token } = useAuth();
  const userRole = getUserRole();
  if (!token || (role && allowedUsers.includes(role) && userRole !== role)) {
    window.location.href = `${landingUrl}login`;
    return null;
  }

  return children;
};

export default Protected_Route;
