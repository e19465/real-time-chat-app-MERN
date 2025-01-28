import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { AnimationTypes } from "../../constants/shared";
import AuthService from "../../services/AuthService";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import { useNavigate } from "react-router-dom";
import { AuthPageUrls } from "../../constants/pageUrls";
import LeftRegionContainer from "../../components/auth/LeftRegionContainer";
import AuthForm from "../../components/auth/AuthForm";
import { Eye, EyeOff, Key, Lock, Mail, MessageSquare } from "lucide-react";
import InputContainer from "../../components/auth/InputContainer";
import AuthImagePattern from "../../components/auth/AuthImagePattern";
import AuthUsefullLinks from "../../components/auth/AuthUsefullLinks";
import { useAuthStore } from "../../store/useAuthStore";

const ResetPasswordPage = () => {
  //! Hooks
  const navigate = useNavigate();

  //! Accessing store to perform actions
  const passwordResetSendedEmail = useAuthStore(
    (store) => store.passwordResetSendedEmail
  );
  const clearPasswordResetSendedEmail = useAuthStore(
    (store) => store.clearPasswordResetSendedEmail
  );

  //! State variables
  const [formData, setFormData] = useState({
    email: passwordResetSendedEmail,
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  //! methods for toggling password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  //! Handle form submission and reset password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AuthService.resetPassword(formData);
      globalSuccessHandler(response, "Password reset successful");
      clearPasswordResetSendedEmail();
      navigate(AuthPageUrls.signIn);
    } catch (err) {
      globalErrorHandler(
        err,
        "Error resetting password",
        "Something went wrong when resetting password, Please try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LeftRegionContainer region="left">
        <AuthForm
          TopIcon={MessageSquare}
          handleSubmit={handleSubmit}
          topTitle="Reset Password"
          topSubtitle="Reset your password to get back into your account"
          loading={loading}
          loadingBtnText="Resetting..."
          notLoadingBtnText="Reset Password"
        >
          <InputContainer label="Email" Icon={Mail}>
            <input
              type="email"
              required
              className="grow placeholder:text-sm"
              name="email-password-reset"
              id="email-password-reset"
              placeholder="jodndoe@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer label="OTP" Icon={Key}>
            <input
              type="text"
              required
              className="grow placeholder:text-sm"
              name="otp-password-reset"
              id="otp-password-reset"
              placeholder="Enter OTP..."
              value={formData.otp}
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer label="Password" Icon={Lock}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="grow placeholder:text-sm"
              required
              placeholder="New password..."
              name="password-reset-password"
              id="password-reset-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-primary"
            >
              {isPasswordVisible ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </InputContainer>
          <InputContainer label="Confirm Password" Icon={Lock}>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              className="grow"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              name="confim-password-reset-password"
              id="confim-password-reset-password"
              placeholder="confirm your new password..."
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="text-primary"
            >
              {isConfirmPasswordVisible ? (
                <EyeOff size={24} />
              ) : (
                <Eye size={24} />
              )}
            </button>
          </InputContainer>
        </AuthForm>
        <div className="w-full h-auto mt-2">
          <AuthUsefullLinks
            showSignIn={{
              message: "Remember your current password?",
            }}
            showSendPasswordResetEmail={{
              message: "Didn't received password reset OTP?",
            }}
          />
        </div>
      </LeftRegionContainer>

      <div
        region="right"
        className="flex items-center justify-center w-full h-full"
      >
        <AuthImagePattern
          title="Reset Your Password"
          subtitle="Enter a new password to secure your account. Your new password will help you get back to your account."
          animation={AnimationTypes.ping}
        />
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
