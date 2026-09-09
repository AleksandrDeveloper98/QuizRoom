import clsx from "clsx";
import type { TIconProps } from "./types";
import "./Icon.scss";

const Icon = (props: TIconProps) => {
  const { icon: Component, size = 20, className, ...iconProps } = props;

  return (
    <Component
      className={clsx(className, "icon")}
      aria-hidden="true"
      width={size}
      height={size}
      {...iconProps}
    />
  );
};

export default Icon;
