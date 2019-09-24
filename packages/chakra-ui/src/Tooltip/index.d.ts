import * as React from "react";
import { BoxProps } from "../Box";
import { PopperProps } from "../Popper";

export interface ITooltip {
  "aria-label": string;
  /**
   * The delay in `ms` for the tooltip to show
   */
  showDelay?: number;
  /**
   * The delay in `ms` for the tooltip to hide
   */
  hideDelay?: number;
  /**
   * The label of the tooltip.
   */
  label?: string;
  /**
   * The `ReactNode` to be used as the trigger of the tooltip.
   */
  children: React.ReactNode;
  /**
   * If `true` display an arrow tip on the tooltip.
   */
  hasArrow?: boolean;
  placement?: PopperProps["placement"];
  /**
   * If `true` hide the tooltip, when the trigger is clicked.
   */
  closeOnClick?: boolean;
  /**
   * If `true`, the tooltip is initially shown.
   */
  defaultIsOpen?: boolean;
  /**
   * If `true`, the tooltip is shown.
   */
  isOpen?: boolean;
  /**
   * If `true`, the tooltip will wrap the children in a `span` with `tabIndex=0`
   */
  shouldWrapChildren?: boolean;
  /**
   * Function called when the tooltip shows.
   */
  onOpen?: () => void;
  /**
   * Function called when the tooltip hides.
   */
  onClose?: () => void;
}

export type TooltipProps = ITooltip & BoxProps;

declare const Tooltip: React.FC<TooltipProps>;

export default Tooltip;
