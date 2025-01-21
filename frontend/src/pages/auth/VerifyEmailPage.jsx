import AuthService from "../../services/AuthService";
import AuthLayout from "../../layouts/AuthLayout";
import { useState } from "react";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import { authPageUrls } from "../../constants/pageUrls";
import { useNavigate } from "react-router-dom";
import LeftRegionContainer from "../../components/auth/LeftRegionContainer";
import { Mail, MessageSquare } from "lucide-react";
import InputContainer from "../../components/auth/InputContainer";
import UsefullLinks from "../../components/auth/UsefullLinks";
import AuthImagePattern from "../../components/auth/AuthImagePattern";
import { animationTypes, localStorageKeys } from "../../constants/shared";
import AuthForm from "../../components/auth/AuthForm";

const VerifyEmailPage = () => {
  //! Hooks
  const navigate = useNavigate();

  //! State variables
  const [email, setEmail] = useState(
    localStorage.getItem("email_ver_otp_send_email") || ""
  );
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  //! Handle form submission and verify email
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AuthService.verifyEmail(email, otp);
      globalSuccessHandler(response, "Email verified successfully");
      localStorage.removeItem(localStorageKeys.EMAIL_VER_OTP_SEND_EMAIL);
      navigate(authPageUrls.signIn);
    } catch (err) {
      globalErrorHandler(
        err,
        "Error verifying email",
        "Something went wrong, try again later"
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
          topTitle="Varify Email"
          topSubtitle="Verify your email address to get started"
          loading={loading}
          loadingBtnText="Verifying..."
          notLoadingBtnText="Verify"
        >
          <InputContainer label="Email" Icon={Mail}>
            <input
              type="email"
              className="grow placeholder:text-sm"
              required
              placeholder="johndoe@gmail.com"
              name="verify-email-email"
              id="verify-email-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer label="OTP" Icon={Mail}>
            <input
              type="text"
              className="grow placeholder:text-sm"
              required
              placeholder="Enter your OTP..."
              name="email-verification-otp"
              id="email-verification-otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </InputContainer>
        </AuthForm>
        <div className="w-full h-auto mt-2">
          <UsefullLinks showSignIn={true} showSendEmailVerification={true} />
        </div>
      </LeftRegionContainer>

      <div
        region="right"
        className="flex items-center justify-center w-full h-full"
      >
        <AuthImagePattern
          title="Verify Your Email"
          subtitle="Click the link sent to your inbox to verify your email and complete the process."
          animation={animationTypes.shake}
        />
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
