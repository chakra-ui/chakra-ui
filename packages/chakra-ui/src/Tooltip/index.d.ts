import * as React from "react";
import { BoxProps } from "../Box";

export interface ITooltip {
  bg?: string;
  color?: string;
  label?: string;
  timeout?: number;
  children?: React.ReactNode;
  showArrow?: boolean;
  placement?: string;
  closeOnClick?: boolean;
  defaultOpen?: string;
  isOpen?: boolean;
  onOpenChange?: () => void;
}

export type TooltipProps = ITooltip & BoxProps;

declare const Tooltip: React.FC<TooltipProps>;

export default Tooltip;
