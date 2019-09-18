import * as React from "react";
import * as StyledSystem from "styled-system";
import * as Emotion from "@emotion/styled";
import { PseudoBoxProps } from "../PseudoBox";

export interface ILink {
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean;
  /**
   * If `true`, the link will be disabled and not tabbable
   */
  isDisabled?: boolean;
  /**
   * Action to perform when clicked
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export type LinkProps = ILink &
  PseudoBoxProps &
  React.HTMLProps<HTMLAnchorElement>;

/**
 * Links are accesible elements used primarily for navigation. This component is
 * styled to resemble a hyperlink and semantically renders an `<a>`.
 */
declare const Link: React.FC<LinkProps>;

export default Link;
