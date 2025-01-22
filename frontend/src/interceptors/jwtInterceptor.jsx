import axios from "axios";
import { authPageUrls } from "../constants/pageUrls";
import { globalErrorHandler } from "../helpers/responseHandler";
import AuthService from "../services/AuthService";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include credentials (cookies) in requests.
});

axiosInstance.interceptors.request.use(
  (request) => {
    // Since cookies are automatically sent with `withCredentials`,
    // there's no need to manually attach tokens in headers.
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    console.error("Request error:", error);
    const originalRequest = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      console.log("Refreshing token...");
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        // Make a request to your auth server to refresh the token using cookies.
        await axios.post(`${BASE_URL}/auth/refresh-tokens`, null, {
          withCredentials: true, // Ensure cookies are included in the refresh request.
        });

        // Retry the original request after the token is refreshed.
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh errors by redirecting to the login page.
        globalErrorHandler(
          refreshError,
          "Token refresh failed",
          "Session Expired"
        );
        AuthService.clearSessionData();
        window.location.href = authPageUrls.signIn;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export default axiosInstance;
