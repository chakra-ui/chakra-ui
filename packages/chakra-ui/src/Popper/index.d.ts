import * as React from "react";
import PopperJs, { ReferenceObject } from "popper.js";
import { PortalProps } from "../Portal";
import { PseudoBoxProps } from "../PseudoBox";

type RenderProps = {
  placement?: PopperJs.Placement;
  transitionProps?: object;
};

type PopperChildren =
  | {
      children: React.ReactNode;
    }
  | { children: (props: RenderProps) => void };

export interface IPopper {
  anchorEl?: null | ReferenceObject | (() => ReferenceObject);
  container?: PortalProps["container"];
  usePortal?: boolean;
  unmountOnExit?: boolean;
  modifiers?: PopperJs.Modifiers;
  isOpen: boolean;
  placement?: PopperJs.Placement;
  popperOptions?: object;
  popperRef?: React.Ref<PopperJs>;
  willUseTransition?: boolean;
  /**
   * If `true` and the `PopoverArrow` isn't render, we'll remove the margin applied
   * to the `PopoverContent`
   */
  hasArrow?: boolean;
  /**
   * The size of the arrow in pixels
   * @default "1rem"
   */
  arrowSize?: string;
  /**
   * The color to apply to the `box-shadow` of the arrow.
   * @default "rgba(0, 0, 0, 0.1)"
   */
  arrowShadowColor?: string;
}

export type PopperProps = IPopper & PseudoBoxProps;

declare const Popper: React.FC<PopperProps>;

export default Popper;
