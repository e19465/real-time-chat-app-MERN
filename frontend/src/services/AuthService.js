import { localStorageKeys } from "../constants/shared";
import axiosInstance from "../interceptors/jwtInterceptor";

class AuthService {
  // The register method
  async register(formData) {
    try {
      const response = await axiosInstance.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error in register: ", error);
      throw error;
    }
  }

  // The login method
  async login(formData) {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      return response.data;
    } catch (error) {
      console.error("Error in login: ", error);
      throw error;
    }
  }

  // The logout method
  async logout() {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    } catch (err) {
      console.error("Error in logout: ", err);
      throw err;
    }
  }

  // The sendEmailVerificationEmail method
  async sendEmailVerificationEmail(email) {
    try {
      const response = await axiosInstance.post("/auth/send-email-otp", {
        email,
      });
      return response.data;
    } catch (err) {
      console.error("Error in sendEmailVerificationEmail: ", err);
      throw err;
    }
  }

  // The verifyEmail method
  async verifyEmail(email, otp) {
    try {
      const response = await axiosInstance.post("/auth/verify-email", {
        email,
        otp,
      });
      return response.data;
    } catch (err) {
      console.error("Error in verifyEmail: ", err);
      throw err;
    }
  }

  // The sendPasswordResetEmail method
  async sendPasswordResetEmail(email) {
    try {
      const response = await axiosInstance.post(
        "/auth/send-password-reset-otp",
        {
          email,
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error in sendPasswordResetEmail: ", err);
      throw err;
    }
  }

  // The resetPassword method
  async resetPassword(formData) {
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email: formData.email,
        otp: formData.otp,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      return response.data;
    } catch (err) {
      console.error("Error in resetPassword: ", err);
      throw err;
    }
  }

  // changePassword method
  async changePassword(formData) {
    try {
      const response = await axiosInstance.post("/auth/change-password", {
        password: formData.password,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword,
      });
      return response.data;
    } catch (err) {
      console.error("Error in changePassword: ", err);
      throw err;
    }
  }

  // Get user details from local storage
  getUserInfoFromLocalStorage() {
    const userId = localStorage.getItem(localStorageKeys.USER_ID);
    const userEmail = localStorage.getItem(localStorageKeys.USER_EMAIL);
    const userFullName = localStorage.getItem(localStorageKeys.USER_FULL_NAME);
    return { userId, userEmail, userFullName };
  }

  // set user details in local storage
  setUserInfoToLocalStorage(data) {
    localStorage.setItem(localStorageKeys.USER_ID, data?.userId);
    localStorage.setItem(localStorageKeys.USER_EMAIL, data?.userEmail);
    localStorage.setItem(localStorageKeys.USER_FULL_NAME, data?.userFullName);
  }
}

export default new AuthService();
