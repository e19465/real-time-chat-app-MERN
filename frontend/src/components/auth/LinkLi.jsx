import { ProgressLink } from "../nprogress/NProgressHandler";

const LinkLi = ({ link, title, linkText }) => {
  return (
    <li className="text-sm flex items-center justify-center gap-1">
      <span>{title}&nbsp;</span>
      <ProgressLink
        to={link}
        className="text-primary hover:text-primary-focus transition-colors"
      >
        {linkText}
      </ProgressLink>
    </li>
  );
};

export default LinkLi;
