import { currentLanguageCode } from "../utils/switchLang";

export function formatDate(dateString, type) {
  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const countryOption = currentLanguageCode === "en" ? "en-US" : "ar-EG";
  const formattedDate = date.toLocaleDateString(countryOption, options);
  if (type !== "date_only") {
    const formattedTime = date
      .toLocaleTimeString("en-US", timeOptions)
      .replace(" ", "");
    return `${formattedDate}, ${formattedTime}`;
  } else {
    return formattedDate;
  }
}
