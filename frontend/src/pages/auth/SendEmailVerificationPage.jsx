import AuthService from "../../services/AuthService";
import AuthLayout from "../../layouts/AuthLayout";
import { useState } from "react";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import { authPageUrls } from "../../constants/pageUrls";
import { useNavigate } from "react-router-dom";
import InputContainer from "../../components/auth/InputContainer";
import { Mail, MessageSquare } from "lucide-react";
import LeftRegionContainer from "../../components/auth/LeftRegionContainer";
import AuthForm from "../../components/auth/AuthForm";
import AuthImagePattern from "../../components/auth/AuthImagePattern";
import { animationTypes, localStorageKeys } from "../../constants/shared";
import AuthUsefullLinks from "../../components/auth/AuthUsefullLinks";

const SendEmailVerificationPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AuthService.sendEmailVerificationEmail(email);
      globalSuccessHandler(
        response,
        "Email verification OTP has been successfully sent to your email"
      );
      localStorage.setItem(localStorageKeys.EMAIL_VER_OTP_SEND_EMAIL, email);
      navigate(authPageUrls.verifyEmail);
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
          topTitle="Send Email Verification"
          topSubtitle="Send an OTP email to verify your email address"
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
              name="send-email-verification-email"
              id="send-email-verification-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
        </AuthForm>
        <div className="w-full h-auto mt-2">
          <AuthUsefullLinks
            showSignUp={{
              message: "Don't have an account?",
            }}
            showSignIn={{
              message: "Already have an account?",
            }}
            showVerifyEmail={{
              message: "Already have an email verify OTP?",
            }}
          />
        </div>
      </LeftRegionContainer>

      <div
        region="right"
        className="flex items-center justify-center w-full h-full"
      >
        <AuthImagePattern
          title="Almost There!"
          subtitle="We just need to verify your email address. Check your inbox for the verification link."
          animation={animationTypes.bounce}
        />
      </div>
    </AuthLayout>
  );
};

export default SendEmailVerificationPage;
