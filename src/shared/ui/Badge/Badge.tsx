import clsx from "clsx";
import "./Badge.scss";
import type { TBadgeProps } from "./types";

const Badge = (props: TBadgeProps) => {
  const { children, variant } = props;
  
  return <span className={clsx("badge", `badge--${variant}`)}>{children}</span>;
};

export default Badge;
