import * as React from "react";
import * as ReactPopper from "react-popper";
import StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";

interface IPopover {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  maxWidth?: StyledSystem.MaxWidthProps["maxWidth"];
  trigger?: React.ReactNode;
  placement?: ReactPopper.PopperProps["placement"];
  children: React.ReactNode;
  showArrow?: boolean;
  showCloseButton?: boolean;
  initialFocusRef?: React.Ref<{}>;
  usePortal?: boolean;
  onOpenChange?: () => void;
  trapFocus?: boolean;
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
}

export type PopoverProps = IPopover & BoxProps;

declare const Popover: React.FC<PopoverProps>;

export const PopoverContent: React.FC<
  BoxProps & React.RefAttributes<HTMLElement>
>;

export const PopoverHeader: React.FC<BoxProps>;
export const PopoverFooter: React.FC<BoxProps>;
export const PopoverBody: React.FC<BoxProps & { isScrollable?: boolean }>;
export const PopoverCloseButton: React.FC<
  PseudoBoxProps & { onClick?: React.MouseEventHandler<HTMLButtonElement> }
>;

export default Popover;
