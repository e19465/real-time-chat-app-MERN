import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import LeftRegionContainer from "../../components/auth/LeftRegionContainer";
import AuthLayout from "../../layouts/AuthLayout";
import { useState } from "react";
import AuthService from "../../services/AuthService";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import { AnimationTypes, LocalStorageKeys } from "../../constants/shared";
import { AuthPageUrls } from "../../constants/pageUrls";
import { Mail, MessageSquare } from "lucide-react";
import InputContainer from "../../components/auth/InputContainer";
import AuthImagePattern from "../../components/auth/AuthImagePattern";
import AuthUsefullLinks from "../../components/auth/AuthUsefullLinks";

const SendPasswordResetEmailPage = () => {
  //! Hooks
  const navigate = useNavigate();

  //! State variables
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //! Handle form submission and send password reset email
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AuthService.sendPasswordResetEmail(email);
      globalSuccessHandler(
        response,
        "Password reset OTP has been successfully sent to your email"
      );
      localStorage.setItem(LocalStorageKeys.PASSWORD_VER_OTP_SEND_EMAIL, email);
      navigate(AuthPageUrls.resetPassword);
    } catch (err) {
      globalErrorHandler(
        err,
        "Error sending email",
        "Something went wrong when sending email, Please try again later"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <LeftRegionContainer region="left">
        <AuthForm
          handleSubmit={handleSubmit}
          TopIcon={MessageSquare}
          topTitle="Send Password Reset Email"
          topSubtitle="Send an OTP email to reset your password"
          loading={loading}
          loadingBtnText="Sending..."
          notLoadingBtnText="Send OTP Email"
        >
          <InputContainer label="Email" Icon={Mail}>
            <input
              type="email"
              className="grow placeholder:text-sm"
              required
              placeholder="johndoe@gmail.com"
              name="send-pass-reset-email"
              id="send-pass-reset-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
        </AuthForm>
        <div className="w-full h-auto mt-2">
          <AuthUsefullLinks
            showSignIn={{
              message: "Already have an account?",
            }}
            showSignUp={{
              message: "Don't have an account?",
            }}
            showResetPassword={{
              message: "Already have password reset OTP?",
            }}
          />
        </div>
      </LeftRegionContainer>

      <div
        region="right"
        className="flex items-center justify-center w-full h-full"
      >
        <AuthImagePattern
          title="Forgot Your Password?"
          subtitle="No worries! We'll send you an email to reset your password and regain access."
          animation={AnimationTypes.wiggle}
        />
      </div>
    </AuthLayout>
  );
};

export default SendPasswordResetEmailPage;
