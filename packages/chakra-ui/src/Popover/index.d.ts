import * as React from "react";
import PopperJS from "popper.js";
import StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";
import { PopperProps } from "../Popper";

interface PopoverContextValue {
  popoverRef: React.RefObject<HTMLElement>;
  placement: PopperJS.Placement;
  referenceRef: React.RefObject<HTMLElement>;
  headerId: string;
  bodyId: string;
  popoverId: string;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  trigger: "hover" | "click";
  isOpen: boolean;
  onBlur: React.FocusEventHandler<HTMLElement>;
  closeOnEsc: boolean;
  initialFocusRef: boolean;
  isHoveringRef: React.RefObject<boolean>;
  usePortal: boolean;
}

declare const PopoverContext: React.Context<{}>;
declare const usePopoverContext: () => PopoverContextValue | undefined;

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
   * If not provided, we generate a unique id.
   *
   * This `id` is also used to auto-generate the `aria-labelledby`
   * and `aria-decribedby` attributes that points to the `PopoverHeader` and `PopoverBody`
   */
  id?: string;
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
  initialFocusRef?: React.RefObject<HTMLElement>;
  /**
   * The interaction that triggers the popover.
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
  /**
   * If true the popover is displayed with a Portal. 
   * Rendering content inside a Portal allows the popover content 
   * to escape the physical bounds of its parent while still being 
   * positioned correctly relative to its target
  */
  usePortal?: boolean;
}

type PopoverProps = IPopover & PopoverChildren;
export const Popover: React.FC<PopoverProps>;

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
  gutter?: number;
  /**
   * If the `PopoverHeading` isn't rendered, use this prop to add
   * an accessible label to the popover.
   */
  "aria-label"?: string;
}
type PopoverContentProps = IPopoverContent & PopperProps;
export const PopoverContent: React.FC<PopoverContentProps>;

export const PopoverArrow: React.FC<BoxProps>;
export const PopoverHeader: React.FC<BoxProps>;
export const PopoverFooter: React.FC<BoxProps>;
export const PopoverBody: React.FC<BoxProps>;

type PopoverCloseButtonProps = PseudoBoxProps & {
  onClick?: React.MouseEventHandler<HTMLElement>;
};
export const PopoverCloseButton: React.FC<PopoverCloseButtonProps>;
