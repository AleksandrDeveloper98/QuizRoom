import type { ButtonHTMLAttributes } from "react";
import type { LinkProps } from "react-router-dom";

type TNativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: never;
};

type TLinkButtonProps = LinkProps;

export type TButtonProps = TNativeButtonProps | TLinkButtonProps;
