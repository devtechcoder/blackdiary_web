import { message } from "antd";

export const Severty = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

const toastOptions = {
  duration: 2,
};

export const ShowToast = (msg, type) => {
  if (!msg) return;

  switch (type) {
    case "success":
      message.open({
        type: "success",
        content: msg,
        ...toastOptions,
      });
      break;
    case "error":
      message.open({
        type: "error",
        content: msg,
        ...toastOptions,
      });
      break;
    case "warning":
      message.open({
        type: "warning",
        content: msg,
        ...toastOptions,
      });
      break;
    case "info":
      message.open({
        type: "info",
        content: msg,
        ...toastOptions,
      });
      break;
    default:
      message.open({
        type: "info",
        content: msg,
        ...toastOptions,
      });
      break;
  }
};
