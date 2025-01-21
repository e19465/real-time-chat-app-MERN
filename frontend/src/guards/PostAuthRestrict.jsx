import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commonPageUrls } from "../constants/pageUrls";

const PostAuthRestrictRoute = ({ children }) => {
  const isAuthenticated = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(commonPageUrls.home, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default PostAuthRestrictRoute;
