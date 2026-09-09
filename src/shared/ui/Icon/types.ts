import type { ComponentType, SVGProps } from "react";

type TIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type TIconProps = {
  icon: TIconComponent;
  size?: number;
} & SVGProps<SVGSVGElement>;
