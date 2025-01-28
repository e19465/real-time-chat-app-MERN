import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { AuthPageUrls } from "../../constants/pageUrls";
import AuthImagePattern from "../../components/auth/AuthImagePattern";
import { AnimationTypes } from "../../constants/shared";
import InputContainer from "../../components/auth/InputContainer";
import AuthForm from "../../components/auth/AuthForm";
import LeftRegionContainer from "../../components/auth/LeftRegionContainer";
import AuthUsefullLinks from "../../components/auth/AuthUsefullLinks";

const SignUpPage = () => {
  //! Hooks
  const navigate = useNavigate();

  //! State variables
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
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

  //! Handle form submission and sign up
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AuthService.register(formData);
      globalSuccessHandler(response, "Sign up successful");
      navigate(AuthPageUrls.verifyEmail);
    } catch (err) {
      globalErrorHandler(
        err,
        "Error in sign up",
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
          topTitle="Create Account"
          topSubtitle="Get started with your free account"
          loading={loading}
          loadingBtnText="Signing Up..."
          notLoadingBtnText="Sign Up"
        >
          <InputContainer label="Full Name" Icon={User}>
            <input
              type="text"
              className="grow placeholder:text-sm"
              required
              placeholder="John Doe"
              name="full-name-signup"
              id="full-name-signup"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer label="Email" Icon={Mail}>
            <input
              type="email"
              className="grow placeholder:text-sm"
              name="email-signup"
              required
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
              placeholder="your password..."
              required
              name="password-signup"
              id="password-signup"
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
              name="confim-password-signup"
              id="confim-password-signup"
              placeholder="confirm your password..."
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
              message: "Already have an account?",
            }}
          />
        </div>
      </LeftRegionContainer>

      <div
        region="right"
        className="flex items-center justify-center w-full h-full"
      >
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments and stay in touch with your loved ones"
          animation={AnimationTypes.pulse}
        />
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
