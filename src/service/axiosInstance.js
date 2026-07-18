import axios from "axios";
import { apiKey } from "./apiUrl";
import { toast } from "react-toastify";
import { currentLanguageCode } from "../utils/switchLang";

let onLogout;
let showExpireTokenToast = false;
export const setLogoutHandler = (fn) => {
  onLogout = fn;
};
const axiosInstance = axios.create({
  baseURL: apiKey,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ken_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail =
      error?.response?.code ||
      error?.response?.data?.error ||
      error?.response?.data?.detail;
    console.log(detail);
    const shouldLogout =
      detail === "invalid token" ||
      detail === "Token has expired" ||
      detail === "Token expired" ||
      detail === "Given token not valid for any token type" ||
      detail === "User not found" ||
      detail === "User is inactive";

    if (shouldLogout) {
      if (!showExpireTokenToast) {
        showExpireTokenToast = true;
        let message = "";

        if (detail === "User not found") {
          message =
            currentLanguageCode === "en"
              ? "Your account no longer exists. Please contact support or register a new account."
              : "حسابك لم يعد موجودًا. الرجاء التواصل مع الدعم أو تسجيل حساب جديد.";
        } else if (detail === "User is inactive") {
          message =
            currentLanguageCode === "en"
              ? "Your account isn't active yet. We've logged you out and redirected you to the homepage so you can activate it."
              : "حسابك غير مفعل بعد. لقد قمنا بتسجيل خروجك وإعادتك إلى الصفحة الرئيسية لتفعيل الحساب.";
        } else {
          message =
            currentLanguageCode === "en"
              ? "Your session has expired. Please log in again."
              : "انتهت صلاحية الجلسة. الرجاء تسجيل الدخول مرة أخرى.";
        }
        toast.error(message);
      }
      localStorage.removeItem("ken_token");

      if (onLogout) onLogout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
