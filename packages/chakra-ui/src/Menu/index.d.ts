import * as React from "react";
import PopperJS from "popper.js";
import { BoxProps } from "../Box";
import { PopperProps } from "../Popper";
import { PseudoBoxProps } from "../PseudoBox";

interface InternalState {
  isOpen?: boolean;
  onClose?: () => void;
}

type MenuChildren =
  | {
      children: React.ReactNode;
    }
  | { children: (props: InternalState) => React.ReactNode };

export interface IMenu {
  isOpen?: boolean;
  autoSelect?: boolean;
  closeOnBlur?: boolean;
  closeOnSelect?: boolean;
}

export type MenuProps = IMenu & MenuChildren;
declare const Menu: React.FC<MenuProps>;
export default Menu;

export interface IMenuButton {
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
}
export type MenuButtonProps = PseudoBoxProps & IMenuButton;
export const MenuButton: React.FC<MenuButtonProps>;

export interface IMenuList {
  onKeydown?: React.KeyboardEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}
export type MenuListProps = IMenuList & PopperProps;
export const MenuList: React.FC<MenuListProps>;

interface IMenuItem {
  isDisabled?: boolean;
  role?: "menuitem" | "menuitemradio" | "menuitemcheckbox";
  onClick?: React.KeyboardEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
}
export type MenuItemProps = IMenuItem & PseudoBoxProps;

export const MenuItem: React.FC<MenuItemProps>;

interface IMenuGroup {
  title?: string;
  children: React.ReactNode;
}
export type MenuGroupProps = IMenuGroup & BoxProps;
export const MenuGroup: React.FC<MenuGroupProps>;

export const MenuDivider: React.FC<BoxProps>;
export * from "./MenuOption";
