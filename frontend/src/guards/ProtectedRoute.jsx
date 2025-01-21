import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authPageUrls } from "../constants/pageUrls";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(authPageUrls.signIn, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;
