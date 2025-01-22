import { toast } from "react-toastify";
import AuthService from "../services/AuthService";

export const authPageUrls = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  sendEmailVerification: "/auth/send-email-verification",
  verifyEmail: "/auth/verify-email",
  sendPasswordResetEmail: "/auth/send-password-reset-email",
  resetPassword: "/auth/reset-password",
};

export const userPageUrls = {
  settings: "/profile/settings",
  userProfile: "/profile/:userId",
};

export const getOwnProfileUrl = async () => {
  const userInfo = AuthService.getUserInfoFromLocalStorage();
  const userId = userInfo?.userId;
  console.log("called getProfileUrl with userId: ", userId);
  if (userId) {
    return userPageUrls.userProfile.replace(":userId", userId);
  } else {
    localStorage.clear();
    toast.info("Session expired, login again");
    window.location.href = authPageUrls.signIn;
  }
};

export const getOtherProfileUrl = (userId) => {
  return userPageUrls.userProfile.replace(":userId", userId);
};

export const commonPageUrls = {
  home: "/",
};
