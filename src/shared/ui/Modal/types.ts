import type { ReactNode } from "react";

export type TModalProps = {
  open: boolean;  
  title: string;
  actions?: ReactNode;
  children?: ReactNode;
  onClose: () => void;  
};
