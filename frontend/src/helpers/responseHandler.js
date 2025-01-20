import { toast } from "react-toastify";

export const globalErrorHandler = (error, message, defaultMessage) => {
  if (error?.response?.data?.error) {
    toast.error(error.response.data.error);
  } else {
    toast.error(defaultMessage);
  }
  console.log(`${message}: ${error}`);
};

export const globalSuccessHandler = (data, defaultMessage) => {
  if (data?.message) {
    toast.success(data.message);
  } else {
    toast.success(defaultMessage);
  }
};
