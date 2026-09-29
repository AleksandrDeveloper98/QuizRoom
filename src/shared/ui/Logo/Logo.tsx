import clsx from "clsx";
import type { TLogoProps } from "./types";

import "./Logo.scss";

const Logo = (props: TLogoProps) => {
  const { className } = props;
  return (
    <span className={clsx("logo", className)}>
      Quiz<span className="logo__half">Room</span>
    </span>
  );
};

export default Logo;
