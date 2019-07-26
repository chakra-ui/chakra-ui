import { Placement } from "popper.js";
import { MaxWidthProps } from "styled-system";
import { BoxProps } from "../Box";
import { RefAttributes } from "react";
import { PseudoBoxProps } from "../PseudoBox";

interface IPopover {
  isOpen?: boolean;
  defaultOpen?: boolean;
  maxWidth?: MaxWidthProps;
  trigger?: React.ReactNode;
  placement?: Placement;
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

export const PopoverContent: React.ForwardRefExoticComponent<
  BoxProps & RefAttributes<HTMLElement>
>;

export const PopoverHeader: React.FC<BoxProps>;
export const PopoverFooter: React.FC<BoxProps>;
export const PopoverBody: React.FC<BoxProps & { isScrollable?: boolean }>;
export const PopoverCloseButton: React.FC<
  PseudoBoxProps & { onClick: (e: React.MouseEvent) => void }
>;

export default Popover;
