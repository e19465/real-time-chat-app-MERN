import { Navigate } from "react-router-dom";
import { CommonPageUrls } from "../constants/pageUrls";
import { useAuthStore } from "../store/useAuthStore";

const PostAuthRestrictRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated()) {
    return <Navigate to={CommonPageUrls.home} />;
  }
  return children;
};

export default PostAuthRestrictRoute;
