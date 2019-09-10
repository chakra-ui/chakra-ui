import * as React from "react";
import PopperJS from "popper.js";
import StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";

interface IPopover {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  initialFocusRef?: React.Ref<HTMLElement> | null;
  trigger?: "hover" | "click";
  gutter?: string;
  placement?: PopperJS.Placement;
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  children: React.ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
}

export type PopoverProps = IPopover & BoxProps;
declare const Popover: React.FC<PopoverProps>;
export default Popover;

interface IPopoverTrigger {
  children: React.ReactNode;
}
export const PopoverTrigger: React.FC<IPopoverTrigger>;

interface IPopoverContent {
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}
type PopoverContentProps = BoxProps & IPopoverContent;
export const PopoverContent: React.FC<PopoverContentProps>;

export const PopoverArrow: React.FC<BoxProps>;

export const PopoverHeader: React.FC<BoxProps>;
export const PopoverFooter: React.FC<BoxProps>;
export const PopoverBody: React.FC<BoxProps & { isScrollable?: boolean }>;
export const PopoverCloseButton: React.FC<
  PseudoBoxProps & { onClick?: React.MouseEventHandler<HTMLButtonElement> }
>;
