import type { ReactNode } from "react";

export type TModalProps = {
  title: string;
  actions?: ReactNode;
  children?: ReactNode;
  onClose: () => void;
};
