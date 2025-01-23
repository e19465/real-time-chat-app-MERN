import { useAuthStore } from "../store/useAuthStore";

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
  singleChat: "/chat/:userId",
};

export const getChatUrl = (userId) => {
  return CommonPageUrls.singleChat.replace(":userId", userId);
};

export const getOwnProfileUrl = () => {
  const { userId, clearSessionData } = useAuthStore.getState();
  if (userId) {
    return UserPageUrls.userProfile.replace(":userId", userId);
  } else {
    clearSessionData();
    window.location.href = AuthPageUrls.signIn;
  }
};

export const getOtherProfileUrl = (userId) => {
  return UserPageUrls.userProfile.replace(":userId", userId);
};
