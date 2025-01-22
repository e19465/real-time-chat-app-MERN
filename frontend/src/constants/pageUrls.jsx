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

export const getOwnProfileUrl = () => {
  const userInfo = AuthService.getUserInfoFromLocalStorage();
  const userId = userInfo?.userId;
  if (userId) {
    return userPageUrls.userProfile.replace(":userId", userId);
  } else {
    localStorage.clear();
    window.location.href = authPageUrls.signIn;
  }
};

export const getOtherProfileUrl = (userId) => {
  return userPageUrls.userProfile.replace(":userId", userId);
};

export const commonPageUrls = {
  home: "/",
};
