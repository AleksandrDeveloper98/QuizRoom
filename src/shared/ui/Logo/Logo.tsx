import clsx from "clsx";
import "./Logo.scss";
import type { TLogoProps } from "./types";
import { Link } from "react-router-dom";
import { routes } from "@/shared/constants/routes";

const Logo = (props: TLogoProps) => {
  const { className } = props;

  return (
    <Link to={routes.rooms}  className={clsx("logo", className)}>
      Quiz<span className="logo__half">Room</span>
    </Link>
  );
};

export default Logo;
