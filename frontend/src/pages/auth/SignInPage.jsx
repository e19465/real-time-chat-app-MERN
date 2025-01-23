import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare } from "lucide-react";
import AuthImagePattern from "../../components/auth/AuthImagePattern";
import { AnimationTypes } from "../../constants/shared";
import InputContainer from "../../components/auth/InputContainer";
import AuthForm from "../../components/auth/AuthForm";
import LeftRegionContainer from "../../components/auth/LeftRegionContainer";
import AuthUsefullLinks from "../../components/auth/AuthUsefullLinks";
import { useAuthStore } from "../../store/useAuthStore";

const SignInPage = () => {
  //! Hooks
  const navigate = useNavigate();
  const { setUserInfoToLocalStorage } = useAuthStore();

  //! State variables
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  //! methods for toggling password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  //! Handle form submission and sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AuthService.login(formData);
      globalSuccessHandler(response, "Login successful");
      setUserInfoToLocalStorage(response.data);
      navigate("/", { replace: true });
    } catch (err) {
      globalErrorHandler(
        err,
        "Error in login",
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
          TopIcon={MessageSquare}
          handleSubmit={handleSubmit}
          topTitle="Welcome Back"
          topSubtitle="Sign in to your account to continue"
          loading={loading}
          loadingBtnText="Signing In..."
          notLoadingBtnText="Sign In"
        >
          <InputContainer label="Email" Icon={Mail}>
            <input
              type="email"
              required
              className="grow placeholder:text-sm"
              name="email-signup"
              id="email-signup"
              placeholder="jodndoe@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer label="Password" Icon={Lock}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="grow placeholder:text-sm"
              required
              placeholder="your password..."
              name="password-signin"
              id="password-signin"
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
        </AuthForm>
        <div className="w-full h-auto mt-2">
          <AuthUsefullLinks
            showResetPassword={{
              message: "Forgot password?",
            }}
            showVerifyEmail={{
              message: "Didn't verify your email?",
            }}
            showSendEmailVerification={{
              message: "Didn't receive verification email?",
            }}
            showSignUp={{
              message: "Don't have an account?",
            }}
          />
        </div>
      </LeftRegionContainer>

      <div
        region="right"
        className="flex items-center justify-center w-full h-full"
      >
        <AuthImagePattern
          title="Let's Get You Connected"
          subtitle="Start connecting with your loved ones by getting into your account."
          animation={AnimationTypes.spin}
        />
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
