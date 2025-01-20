import axiosInstance from "../interceptors/jwtInterceptor";

class AuthService {
  // The register method
  async register(fullName, email, password, confirmPassword) {
    try {
      const response = await axiosInstance.post("/auth/register", {
        fullName,
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error in register: ", error);
      throw error;
    }
  }

  // The login method
  async login(email, password) {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
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
  async resetPassword(email, otp, password, confirmPassword) {
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email,
        otp,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (err) {
      console.error("Error in resetPassword: ", err);
      throw err;
    }
  }

  // changePassword method
  async changePassword(password, newPassword, confirmPassword) {
    try {
      const response = await axiosInstance.post("/auth/change-password", {
        password,
        newPassword,
        confirmNewPassword,
      });
      return response.data;
    } catch (err) {
      console.error("Error in changePassword: ", err);
      throw err;
    }
  }
}

export default new AuthService();
