import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import {
  AuthPageUrls,
  CommonPageUrls,
  UserPageUrls,
} from "./constants/pageUrls";
import { PostAuthRestrictRoute, ProtectedRoute } from "./guards";
import {
  // Common Pages
  HomePage,
  NotFoundPage,

  // Auth Pages
  SignInPage,
  SignUpPage,
  SendEmailVerificationPage,
  VerifyEmailPage,
  SendPasswordResetEmailPage,
  ResetPasswordPage,

  // User Account Related Pages
  UserProfilePage,
  UserSettingsPage,
} from "./pages";
import NProgressDoneComponent from "./components/nprogress/NProgressDoneComponent";
import { useThemeStore } from "./store/useThemeStore";
import ChatPage from "./pages/chat/ChatPage";

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div className="w-full min-h-screen h-auto" data-theme={theme}>
      <ToastContainer theme="light" />
      <NProgressDoneComponent />
      <Routes>
        {/******************************* - Common Pages - ******************************************/}
        <Route
          path={CommonPageUrls.home}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          exact
        />

        {/********************************* - Auth Pages - ******************************************/}

        <Route
          path={AuthPageUrls.signIn}
          element={
            <PostAuthRestrictRoute>
              <SignInPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={AuthPageUrls.signUp}
          element={
            <PostAuthRestrictRoute>
              <SignUpPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={AuthPageUrls.sendEmailVerification}
          element={
            <PostAuthRestrictRoute>
              <SendEmailVerificationPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={AuthPageUrls.verifyEmail}
          element={
            <PostAuthRestrictRoute>
              <VerifyEmailPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={AuthPageUrls.sendPasswordResetEmail}
          element={
            <PostAuthRestrictRoute>
              <SendPasswordResetEmailPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={AuthPageUrls.resetPassword}
          element={
            <PostAuthRestrictRoute>
              <ResetPasswordPage />
            </PostAuthRestrictRoute>
          }
        />

        {/************************ - User Account Related Pages - **********************************/}

        <Route
          path={UserPageUrls.settings}
          element={
            <ProtectedRoute>
              <UserSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={UserPageUrls.userProfile}
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        {/************************ - Chat Related Pages - **********************************/}
        <Route
          path={CommonPageUrls.singleChat}
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        {/******************************************************************************/}

        {/* Not found page */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
