import type { ReactNode } from "react";

export type TOptionGroupProps<T extends string | number> = {
  name: string;
  title: string;
  hiddenTitle?: boolean;
  options: readonly T[];
  value?: T;
  onChange: (value: T) => void;
  getLabel?: (option: T) => ReactNode;
  unit?: string;
};
