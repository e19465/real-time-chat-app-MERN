import { toast } from "react-toastify";

export const globalErrorHandler = (
  error,
  message = null,
  defaultMessage = null
) => {
  if (error?.response?.data?.error) {
    toast.error(error.response.data.error);
  } else if (defaultMessage) {
    toast.error(defaultMessage);
  }

  if (message) {
    console.log(`${message}: ${error}`);
  } else {
    console.log("Error occurred: ", error);
  }
};

export const globalSuccessHandler = (data, defaultMessage = null) => {
  if (data?.message) {
    toast.success(data.message);
  } else if (defaultMessage) {
    toast.success(defaultMessage);
  }
};
