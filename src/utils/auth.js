import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem("ken_token");
  if (!token) return localStorage.getItem("ken_role") || null;

  try {
    const decoded = jwtDecode(token);

    return decoded.role || localStorage.getItem("ken_role") || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return localStorage.getItem("ken_role") || null;
  }
};
