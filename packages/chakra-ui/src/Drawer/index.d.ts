import * as React from "react";

interface IDrawer {
  /**
   * If `true`, the drawer is shown.
   */
  isOpen?: boolean;
  /**
   * Callback invoked when user closes the drawer.
   */
  onClose?: () => void;
  /**
   * Callback invoked when user closes the drawer.
   */
  children: React.ReactNode;
  /**
   * The size of the drawer when placement is `left` or `right`.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   *  If `true`, the drawer fills the height of the viewport by default.
   */
  isFullHeight?: boolean;
  /**
   * The ref to the initial element to receive focus when the drawer opens.
   */
  initialFocusRef?: React.Ref<{}>;
  /**
   *  If `true`, show the drawer overlay by default.
   */
  hideOverlay?: boolean;
  /**
   *  Set the position of the drawer.
   */
  placement?: "top" | "left" | "bottom" | "right";
  /**
   *  The zIndex of the drawer.
   */
  zIndex?: number | string;
  /**
   *  The background color of the overlay.
   */
  overlayBg?: string;
}

interface IDrawerTransition {
  isOpen: boolean;
  children: React.ReactNode;
  duration: number;
  placement: string;
  isFullHeight: boolean;
}

export type DrawerProps = IDrawer;

export type DrawerTransitionProps = IDrawerTransition;

declare const Drawer: React.FC<DrawerProps>;

export const DrawerTransition: React.FC<DrawerTransitionProps>;

export default Drawer;
