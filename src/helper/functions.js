import moment from "moment";
import lang from "./langHelper";
import { Severty, ShowToast } from "./toast";
import { Image } from "antd";

export const getFileExtension = (url) => {
  const filename = url.substring(url.lastIndexOf("/") + 1);
  const extension = filename.substring(filename.lastIndexOf(".") + 1);
  return extension;
};

export const isObjectEmpty = (obj) => {
  for (const key in obj) {
    if (obj[key]) {
      if (obj[key] === '{"min":0,"max":20000000}') {
      } else {
        return false;
      }
    }
  }
  return true;
};

export const formatTimeAgo = (date) => {
  const now = moment();
  const postTime = moment(date);
  const diff = now.diff(postTime, lang("minutes"));

  if (diff < 1) return lang("Just now");
  if (diff < 60) return `${diff} ${diff === 1 ? lang("minute") : lang("minutes")} ${lang("ago")}`;
  if (diff < 24 * 60) return `${Math.floor(diff / 60)} ${Math.floor(diff / 60) === 1 ? lang("hour") : lang("hours")} ${lang("ago")}`;
  if (diff < 30 * 24 * 60) return `${Math.floor(diff / (24 * 60))} ${Math.floor(diff / (24 * 60)) === 1 ? lang("day") : lang("days")} ${lang("ago")}`;
  return postTime.format("ll");
};

export const formatStringDate = (dateString) => {
  const today = moment().startOf("day");
  const date = moment(dateString).startOf("day");
  const diffDays = today.diff(date, "days");

  if (diffDays === 0) return lang("Today");
  if (diffDays === 1) return lang("Yesterday");
  if (diffDays <= 30) return `${diffDays} ${lang("days ago")}`;
  return date.format("MMM D, YYYY"); // e.g., "Jul 19, 2024"
};

export const maskEmail = (email) => {
  const [name, domain] = email.split("@");
  const maskedName = name[0] + "*".repeat(name.length - 2) + name.slice(-1);
  const [domainName, domainExt] = domain.split(".");
  const maskedDomain = domainName[0] + "*".repeat(domainName.length - 1);
  return `${maskedName}@${maskedDomain}.${domainExt}`;
};

export const maskPhone = (phone) => {
  if (!phone) return "";
  const visibleStart = phone.slice(0, 2); // show first 2 digits
  const visibleEnd = phone.slice(-2); // show last 2 digits
  const maskedMiddle = "*".repeat(phone.length - 4);
  return `${visibleStart}${maskedMiddle}${visibleEnd}`;
};

export const defaultUserImage = (name) => {
  return name?.charAt(0).toUpperCase() ?? "?";
};

export const showError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // ShowToast("User denied the request for Geolocation.", Severty.ERROR);
      break;
    case error.POSITION_UNAVAILABLE:
      // ShowToast("Location information is unavailable.", Severty.ERROR);
      break;
    case error.TIMEOUT:
      // ShowToast("The request to get user location timed out.", Severty.ERROR);
      break;
    case error.UNKNOWN_ERROR:
      // ShowToast("An unknown error occurred.", Severty.ERROR);
      break;
  }
};

export const getOriginalUserName = (username) => {
  if (!username) return "";
  return username.startsWith("@") ? username.substring(1) : username;
};
