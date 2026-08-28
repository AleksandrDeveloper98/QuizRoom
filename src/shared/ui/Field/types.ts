import type { InputHTMLAttributes } from "react";

export type TFieldProps = {
  id: string;
  label: string;
  hiddenLabel?: boolean;
  error?: string;
  inputClassName?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;
