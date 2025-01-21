import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostAuthRestrictRoute = ({ children }) => {
  const isAuthenticated = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default PostAuthRestrictRoute;
