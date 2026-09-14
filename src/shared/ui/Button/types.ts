import type { ButtonHTMLAttributes } from "react";
import type { LinkProps } from "react-router-dom";

type TButtonVariant = "violet" | "dark" | 'classic';

type TNativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: never;
  variant?: TButtonVariant;
};

type TLinkButtonProps = LinkProps & { variant?: TButtonVariant };

export type TButtonProps = TNativeButtonProps | TLinkButtonProps;
