import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
  SendEmailVerificationPage,
  VerifyEmailPage,
  SendPasswordResetEmailPage,
  ResetPasswordPage,
  UserProfilePage,
  UserSettingsPage,
} from "./pages";

const App = () => {
  return (
    <div className="w-full h-auto min-h-screen">
      <ToastContainer theme="light" />

      <Routes>
        <Route path="/" element={<HomePage />} exact />

        {/* Auth Pages */}
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route
          path="/auth/send-email-verification"
          element={<SendEmailVerificationPage />}
        />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        <Route
          path="/auth/send-password-reset-email"
          element={<SendPasswordResetEmailPage />}
        />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        {/* End - Auth Pages */}

        {/* User Account Related Pages */}
        <Route path="/profile/settings" element={<UserSettingsPage />} />
        <Route path="/profile/:userId" element={<UserProfilePage />} />
        {/* End - User Account Related Pages */}

        {/* Not found page */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
