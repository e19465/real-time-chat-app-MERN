import React from "react";
import { Link } from "react-router-dom";

const LinkLi = ({ link, title, linkText }) => {
  return (
    <li className="text-sm flex items-center justify-center gap-1">
      <span>{title}&nbsp;</span>
      <Link
        to={link}
        className="text-primary hover:text-primary-focus transition-colors"
      >
        {linkText}
      </Link>
    </li>
  );
};

export default LinkLi;
