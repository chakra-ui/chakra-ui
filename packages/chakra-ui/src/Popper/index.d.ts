import * as React from "react";
import PopperJs from "popper.js";
import { PortalProps } from "../Portal";
import { PseudoBoxProps } from "../PseudoBox";
import { BoxProps } from "../Box";

type RenderProps = {
  placement?: PopperJs.Placement;
  transitionProps?: object;
};

type PopperChildren =
  | {
      children: React.ReactNode;
    }
  | { children: (props: RenderProps) => React.ReactNode };

export interface IPopper {
  /**
   * The reference element, or a function that returns the reference element,
   * that will be used to set the placment of the popover.
   *
   * The reference element should be an HTML Element instance or a referenceObject:
   * https://popper.js.org/popper-documentation.html#referenceObject.
   */
  anchorEl?: null | PopperJs.ReferenceObject | (() => PopperJs.ReferenceObject);
  /**
   * The container where the Popper should render.
   * By default, the portal renders it's children as a child of `document.body>`
   */
  container?: PortalProps["container"];
  /**
   * If `true`, the Popper will display in a portal.
   * [Learn more about portals](https://reactjs.org/docs/portals.html)
   *
   * @default true
   */
  usePortal?: boolean;
  /**
   * If `true`, the component will unmount when it closes
   *
   * @default true
   */
  unmountOnExit?: boolean;
  /**
   * This is used to configure how Popper.js computes the positioning of the popper.
   *
   * To ensure the modifiers you pass are performant, [learn how to create a modifier](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
   */
  modifiers?: PopperJs.Modifiers;
  /**
   * If `true`, the popper will be opened in controlled mode
   */
  isOpen?: boolean;
  /**
   * The placement of the popper
   */
  placement?: PopperJs.Placement;
  /**
   * Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance.
   */
  popperOptions?: object;
  /**
   * A ref that points to the used popper instance.
   */
  popperRef?: React.RefObject<PopperJs>;
  /**
   * 🚨 Experiemental: Don't use this prop for now.
   * @ignore
   */
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

export type PopperProps = IPopper & PseudoBoxProps & PopperChildren;

declare const Popper: React.FC<PopperProps>;
export default Popper;

export const PopperArrow: React.FC<BoxProps>;
