import * as React from "react";
import * as ReactPopper from "react-popper";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";

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

////////////////////////////////////////////////////////////////////////

export interface IMenuButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

export type MenuButtonProps = React.RefAttributes<HTMLButtonElement> &
  PseudoBoxProps &
  IMenuButton;

export const MenuButton: React.ForwardRefExoticComponent<MenuButtonProps>;

////////////////////////////////////////////////////////////////////////

export interface IMenuList {
  onKeydown: React.KeyboardEventHandler<HTMLDivElement>;
  onBlur: React.FocusEventHandler<HTMLDivElement>;
}

export type MenuListProps = IMenuList & BoxProps;

export const MenuList: React.FC<MenuListProps>;

////////////////////////////////////////////////////////////////////////

interface IMenuItem {
  isDisabled?: boolean;
  role?: "menuitem" | "menuitemradio" | "menuitemcheckbox";
  onClick?: React.KeyboardEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  onMouseMove?: React.MouseEventHandler<HTMLButtonElement>;
}
export type MenuItemProps = IMenuItem &
  PseudoBoxProps &
  React.RefAttributes<HTMLButtonElement>;

export const MenuItem: React.ForwardRefExoticComponent<MenuItemProps>;

////////////////////////////////////////////////////////////////////////

interface IMenuGroup {
  title?: string;
  children: React.ReactNode;
}

export type MenuGroupProps = IMenuGroup & BoxProps;

export const MenuGroup: React.FC<MenuGroupProps>;

////////////////////////////////////////////////////////////////////////

export const MenuDivider: React.FC<BoxProps>;

export * from "./MenuOption";
