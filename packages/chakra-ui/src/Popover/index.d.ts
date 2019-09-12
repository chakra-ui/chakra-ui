import * as React from "react";
import PopperJS from "popper.js";
import StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";

type InternalState = { isOpen?: boolean; onClose?: () => void };

/**
 * The content of the popover
 */
type PopoverChildren =
  | {
      children: React.ReactNode;
    }
  | { children: (props: InternalState) => React.ReactNode };

interface IPopover {
  /**
   * The html `id` attribute of the popover.
   * If not provided, we use generate a unique id.
   *
   * This `id` is also used to auto-generate the `aria-labelledby`
   * and `aria-decribedby` attributes that points to the `PopoverHeader` and `PopoverBody`
   */
  id: string;
  /**
   * If `true`, the popover will be opened in controlled mode.
   */
  isOpen?: boolean;
  /**
   * If `true`, the popover will be initially opened.
   */
  defaultIsOpen?: boolean;
  /**
   * The `ref` of the element that should receive focus when the popover opens.
   */
  initialFocusRef?: React.Ref<HTMLElement>;
  /**
   * The action that triggers the popover.
   *
   * `hover` - means the popover will open when you hover with mouse or
   * focus with keyboard on the popover trigger
   *
   * `click` - means the popover will open on click or
   * press `Enter` to `Space` on keyboard
   */
  trigger?: "hover" | "click";
  /**
   * If `true`, the popover will return focus to the trigger when it closes
   */
  returnFocusOnClose?: boolean;
  /**
   * The gap (in pixels) to apply between the popover and the target.
   * Used by `popper.js`
   */
  gutter?: number;
  /**
   * The placment of the popover
   */
  placement?: PopperJS.Placement;
  /**
   * If `true`, the popover will close when you blur out it by
   * clicking outside or tabbing out
   */
  closeOnBlur?: boolean;
  /**
   * If `true`, the popover will close when you hit the `Esc` key
   */
  closeOnEsc?: boolean;
  /**
   * Callback fired when the popover opens
   */
  onOpen?: () => void;
  /**
   * Callback fired when the popover closes
   */
  onClose?: () => void;
}

type PopoverProps = IPopover & PopoverChildren;
declare const Popover: React.FC<PopoverProps>;
export default Popover;

interface IPopoverTrigger {
  children: React.ReactNode;
}
export const PopoverTrigger: React.FC<IPopoverTrigger>;

interface IPopoverContent {
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
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
  /**
   * If the `PopoverHeading` isn't rendered, use this prop to add
   * an accessible label to the popover.
   */
  "aria-label"?: string;
}
type PopoverContentProps = PseudoBoxProps & IPopoverContent;
export const PopoverContent: React.FC<PopoverContentProps>;

export const PopoverArrow: React.FC<BoxProps>;
export const PopoverHeader: React.FC<BoxProps>;
export const PopoverFooter: React.FC<BoxProps>;
export const PopoverBody: React.FC<BoxProps>;

type CloseButtonProps = PseudoBoxProps & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export const PopoverCloseButton: React.FC<CloseButtonProps>;
