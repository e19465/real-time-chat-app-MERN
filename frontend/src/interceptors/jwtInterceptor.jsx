import axios from "axios";
import { AuthPageUrls } from "../constants/pageUrls";
import { globalErrorHandler } from "../helpers/responseHandler";
import AuthService from "../services/AuthService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
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
      // console.log("Refreshing token...");
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        // Make a request to your auth server to refresh the token using cookies.
        await AuthService.refreshTokens();

        // Retry the original request after the token is refreshed.
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh errors by redirecting to the login page.
        globalErrorHandler(
          refreshError,
          "Token refresh failed",
          "Session Expired"
        );
        // clear data from storges
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to the login page.
        window.location.href = AuthPageUrls.signIn;

        // Return the error to the original request.
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export default axiosInstance;
