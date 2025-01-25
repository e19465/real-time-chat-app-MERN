import { Navigate } from "react-router-dom";
import { AuthPageUrls } from "../constants/pageUrls";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated()) {
    return <Navigate to={AuthPageUrls.signIn} />;
  }
  return children;
};

export default ProtectedRoute;
