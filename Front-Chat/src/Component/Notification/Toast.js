import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (isSuccess, message) => {
  if (isSuccess) {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }
};
