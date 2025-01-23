import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommonPageUrls } from "../constants/pageUrls";
import { useAuthStore } from "../store/useAuthStore";

const PostAuthRestrictRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Get method reference
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(CommonPageUrls.home, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default PostAuthRestrictRoute;
