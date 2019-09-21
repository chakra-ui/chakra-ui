import * as React from "react";
import { IModal } from "../Modal";

interface IDrawer extends IModal {
  /**
   * The size of the drawer when placement is `left` or `right`.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   *  If `true`, the drawer fills the height of the viewport by default.
   */
  isFullHeight?: boolean;
  /**
   *  Set the position of the drawer should slide from.
   */
  placement?: "top" | "left" | "bottom" | "right";
  /**
   * The element to receive focus when the drawer closes.
   *
   * 🚨 This prop is required.
   * You could point it to the element that triggered the drawer
   */
  finalFocusRef: IModal["finialFocusRef"];
}

interface IDrawerTransition {
  in: IDrawer["isOpen"];
  children?: React.ReactNode;
  duration?: number;
  placement?: IDrawer["placement"];
  isFullHeight?: IDrawer["isFullHeight"];
}

export type DrawerProps = IDrawer;

export type DrawerTransitionProps = IDrawerTransition;

declare const Drawer: React.FC<DrawerProps>;

export const DrawerTransition: React.FC<DrawerTransitionProps>;

export default Drawer;
