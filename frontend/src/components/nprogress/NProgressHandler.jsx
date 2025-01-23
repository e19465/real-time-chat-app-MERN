import { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import { shouldTriggerStartEvent } from "./shouldTriggerStartEvent";

export const ProgressLink = forwardRef(function ProgressLink(
  { to, onClick, ...rest },
  ref
) {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleClick = (event) => {
    if (shouldTriggerStartEvent(to, event)) {
      NProgress.start(); // Start the progress bar
    }
    if (onClick) {
      onClick(event);
    }
    // Navigate to the route programmatically
    event.preventDefault();
    navigate(to);
  };

  const isInternalLink = to && to.startsWith("/"); // Check if it's an internal link
  if (!isInternalLink) {
    // Render a normal anchor tag for external links
    return <a to={to} onClick={onClick} {...rest} ref={ref} />;
  }

  return <Link to={to} onClick={handleClick} {...rest} ref={ref} />;
});
