import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import {
  authPageUrls,
  commonPageUrls,
  userPageUrls,
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

const App = () => {
  return (
    <div className="w-full min-h-screen h-auto">
      <ToastContainer theme="light" />

      <Routes>
        {/******************************* - Common Pages - ******************************************/}
        <Route
          path={commonPageUrls.home}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          exact
        />

        {/********************************* - Auth Pages - ******************************************/}

        <Route
          path={authPageUrls.signIn}
          element={
            <PostAuthRestrictRoute>
              <SignInPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={authPageUrls.signUp}
          element={
            <PostAuthRestrictRoute>
              <SignUpPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={authPageUrls.sendEmailVerification}
          element={
            <PostAuthRestrictRoute>
              <SendEmailVerificationPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={authPageUrls.verifyEmail}
          element={
            <PostAuthRestrictRoute>
              <VerifyEmailPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={authPageUrls.sendPasswordResetEmail}
          element={
            <PostAuthRestrictRoute>
              <SendPasswordResetEmailPage />
            </PostAuthRestrictRoute>
          }
        />
        <Route
          path={authPageUrls.resetPassword}
          element={
            <PostAuthRestrictRoute>
              <ResetPasswordPage />
            </PostAuthRestrictRoute>
          }
        />

        {/************************ - User Account Related Pages - **********************************/}

        <Route
          path={userPageUrls.settings}
          element={
            <ProtectedRoute>
              <UserSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={userPageUrls.userProfile}
          element={
            <ProtectedRoute>
              <UserProfilePage />
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
