import * as React from "react";
import * as StyledSystem from "styled-system";
import * as Emotion from "@emotion/styled";
import { PseudoBoxProps } from "../PseudoBox";

export interface ILink {
  isDisabled?: boolean;
  color?: string;
  isUnstyled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export type LinkProps = ILink & PseudoBoxProps;

declare const Link: React.FunctionComponent<LinkProps>;

export default Link;
