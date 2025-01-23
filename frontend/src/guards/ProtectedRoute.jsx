import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthPageUrls } from "../constants/pageUrls";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(AuthPageUrls.signIn, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;
