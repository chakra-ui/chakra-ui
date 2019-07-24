import * as StyledSystem from "styled-system";
import * as Emotion from "@emotion/styled";
import { PseudoBoxProps } from "../PseudoBox";

export interface LinkProps
  extends React.AnchorHTMLAttributes<{}>,
    PseudoBoxProps {
  isDisabled?: boolean;
  color?: string;
  isUnstyled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

declare const Link: React.FunctionComponent<LinkProps>;

export default Link;
