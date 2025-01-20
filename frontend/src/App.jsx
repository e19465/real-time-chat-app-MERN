import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import {
  authPageUrls,
  commonPageUrls,
  userPageUrls,
} from "./constants/pageUrls";
import ProtectedRoute from "./components/common/ProtectedRoute";
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
    <div className="w-full h-auto min-h-screen">
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

        <Route path={authPageUrls.signIn} element={<SignInPage />} />
        <Route path={authPageUrls.signUp} element={<SignUpPage />} />
        <Route
          path={authPageUrls.sendEmailVerification}
          element={<SendEmailVerificationPage />}
        />
        <Route path={authPageUrls.verifyEmail} element={<VerifyEmailPage />} />
        <Route
          path={authPageUrls.sendPasswordResetEmail}
          element={<SendPasswordResetEmailPage />}
        />
        <Route
          path={authPageUrls.resetPassword}
          element={<ResetPasswordPage />}
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
