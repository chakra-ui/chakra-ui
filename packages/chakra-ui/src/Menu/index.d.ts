import * as React from "react";
import * as ReactPopper from "react-popper";
import { BoxProps } from "../Box";

interface IRenderProps {
  isOpen?: boolean;
  onClose?: () => void;
}

type ChildrenProp =
  | {
      children: React.ReactNode;
    }
  | { children: (props: IRenderProps) => React.ReactNode };

export interface IMenu {
  isOpen?: boolean;
  autoSelect?: boolean;
  closeOnBlur?: boolean;
  closeOnSelect?: boolean;
  placement?: ReactPopper.PopperProps["placement"];
}

export type MenuProps = IMenu & ChildrenProp;
declare const Menu: React.FC<MenuProps>;
export default Menu;

export type MenuButtonProps = { as?: React.ElementType } & React.RefAttributes<
  HTMLButtonElement
>;
export const MenuButton: React.ForwardRefExoticComponent<MenuButtonProps>;

export type MenuListProps = {
  onKeydown: React.KeyboardEventHandler<HTMLDivElement>;
  onBlur: React.FocusEventHandler<HTMLDivElement>;
} & BoxProps;
export const MenuList: React.FC<MenuListProps>;

interface IMenuItem {
  isDisabled?: boolean;
  role?: "menuitem" | "menuitemradio" | "menuitemcheckbox";
  onClick?: React.KeyboardEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onMouseMove?: React.MouseEventHandler;
}
export type MenuItemProps = IMenuItem &
  BoxProps &
  React.RefAttributes<HTMLButtonElement>;
export const MenuItem: React.ForwardRefExoticComponent<MenuItemProps>;

export const MenuDivider: React.FC<BoxProps>;
