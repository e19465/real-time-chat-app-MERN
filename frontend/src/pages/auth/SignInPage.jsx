import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import {
  globalErrorHandler,
  globalSuccessHandler,
} from "../../helpers/responseHandler";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, sentEmail] = useState("dsas@gmail.com");
  const [password, setPassword] = useState("sas5Sa550Aas$");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(email, password);
      globalSuccessHandler(response, "Login successful");
      navigate("/");
    } catch (err) {
      globalErrorHandler(
        err,
        "Error in login",
        "Something went wrong, try again later"
      );
    }
  };

  return (
    <AuthLayout>
      <div className="text-white">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => sentEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
