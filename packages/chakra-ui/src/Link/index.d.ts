import * as React from "react";
import * as StyledSystem from "styled-system";
import * as Emotion from "@emotion/styled";
import { PseudoBoxProps } from "../PseudoBox";

export interface ILink {
  variant?: "bg-underline" | "underline" | "unstyled" | "basic";
  variantColor?: string;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export type LinkProps = ILink & PseudoBoxProps;

declare const Link: React.FunctionComponent<LinkProps>;

export default Link;
