import * as React from "react";
import { PseudoBoxProps } from "../PseudoBox";

interface ICloseButton {
  size: "lg" | "md" | "sm";
  isDisabled: boolean;
  color: string;
  icon: string;
  "aria-label": string;
  onClick: React.KeyboardEventHandler<HTMLButtonElement>;
}

export type CloseButtonProps = ICloseButton & PseudoBoxProps;

declare const CloseButton: React.FC<CloseButtonProps>;

export default CloseButton;
