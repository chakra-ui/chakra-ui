import * as React from "react";
import { IModal, ModalContentProps } from "../Modal";
import { BoxProps } from "../Box";
import { CloseButtonProps } from "../CloseButton";

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
   * You could point it to the element that triggered the drawer
   */
  finalFocusRef?: IModal["finalFocusRef"];
}

export const Drawer: React.FC<IDrawer>;
export const DrawerBody: React.FC<BoxProps>;
export const DrawerHeader: React.FC<BoxProps>;
export const DrawerContent: React.FC<ModalContentProps>;
export const DrawerFooter: React.FC<BoxProps>;
export const DrawerOverlay: React.FC<BoxProps>;
export const DrawerCloseButton: React.FC<CloseButtonProps>;
