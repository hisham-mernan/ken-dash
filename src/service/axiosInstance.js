import axios from "axios";
import { apiKey } from "./apiUrl";
import { toast } from "react-toastify";
import { currentLanguageCode } from "../utils/switchLang";

// The API runs on Vercel, whose serverless functions reject request bodies
// over ~4.5 MB at the edge with a 413 -- before Django runs, so the server
// cannot report anything useful. Forms here can carry a cover image plus a
// gallery in one request, so the total matters, not the per-file size.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const totalFileBytes = (formData) => {
  let total = 0;
  for (const [, value] of formData.entries()) {
    if (value instanceof File || value instanceof Blob) total += value.size;
  }
  return total;
};

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

      // Fail here with a readable message rather than letting the platform
      // drop the request with a 413 that no layer of ours can explain.
      const bytes = totalFileBytes(config.data);
      if (bytes > MAX_UPLOAD_BYTES) {
        const mb = (bytes / 1024 / 1024).toFixed(1);
        const limit = MAX_UPLOAD_BYTES / 1024 / 1024;
        toast.error(
          currentLanguageCode === "en"
            ? `These files total ${mb} MB, over the ${limit} MB upload limit. Please upload fewer images at a time.`
            : `حجم الملفات ${mb} ميجابايت، وهو أكبر من الحد المسموح ${limit} ميجابايت. الرجاء رفع عدد أقل من الصور في المرة الواحدة.`
        );
        return Promise.reject(
          new axios.Cancel(`Upload too large: ${mb} MB > ${limit} MB`)
        );
      }
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
    // A 413 is raised by Vercel before Django sees the request, so it carries
    // no API error body. Without this it surfaces as a silent failure.
    if (error?.response?.status === 413) {
      toast.error(
        currentLanguageCode === "en"
          ? "The upload was rejected for being too large. Please upload fewer or smaller images."
          : "تم رفض الرفع لأن حجمه كبير جدًا. الرجاء رفع صور أقل أو أصغر حجمًا."
      );
      return Promise.reject(error);
    }

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
