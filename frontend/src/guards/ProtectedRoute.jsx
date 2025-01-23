import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthPageUrls } from "../constants/pageUrls";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(AuthPageUrls.signIn, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;
