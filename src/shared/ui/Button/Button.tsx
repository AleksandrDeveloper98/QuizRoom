import { Link } from "react-router-dom";
import type { TButtonProps } from "./types";
import "./Button.scss";
import clsx from "clsx";

const Button = (props: TButtonProps) => {
  const { className, children, ...rest } = props;

  if (rest.to !== undefined) {
    const { to, ...linkProps } = rest;

    return (
      <Link className={clsx(className, "button")} to={to} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest;

  return (
    <button className={clsx(className, "button")} type={type} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
