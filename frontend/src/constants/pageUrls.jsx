import AuthService from "../services/AuthService";

export const AuthPageUrls = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  sendEmailVerification: "/auth/send-email-verification",
  verifyEmail: "/auth/verify-email",
  sendPasswordResetEmail: "/auth/send-password-reset-email",
  resetPassword: "/auth/reset-password",
};

export const UserPageUrls = {
  settings: "/profile/settings",
  userProfile: "/profile/:userId",
};

export const CommonPageUrls = {
  home: "/",
};

export const getOwnProfileUrl = () => {
  const userInfo = AuthService.getUserInfoFromLocalStorage();
  const userId = userInfo?.userId;
  if (userId) {
    return UserPageUrls.userProfile.replace(":userId", userId);
  } else {
    AuthService.clearSessionData();
    window.location.href = AuthPageUrls.signIn;
  }
};

export const getOtherProfileUrl = (userId) => {
  return UserPageUrls.userProfile.replace(":userId", userId);
};
