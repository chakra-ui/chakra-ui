import { FC, ReactNode, ReactElement } from "react";

interface IDrawer {
  /**
   * If `true`, the drawer is shown.
   */
  isOpen: boolean;
  /**
   * Callback invoked when user closes the drawer.
   */
  onClose: () => void;
  /**
   * Callback invoked when user closes the drawer.
   */
  children: ReactNode;
  /**
   * The size of the drawer.
   */
  size: string;
  /**
   *  If `true`, the drawer fills the height of the viewport by default.
   */
  isFullHeight: boolean;
  /**
   * The ref to the initial element to receiver focus when the drawer opens.
   */
  initialFocusRef: React.Ref<{}>;
  /**
   *  If `true`, show the drawer overlay by default.
   */
  hideOverlay: boolean;
  /**
   *  Set the position of the drawer.
   */
  placement: "top" | "left" | "bottom" | "right";
}

export type DrawerProps = IDrawer;

declare const Drawer: FC<DrawerProps>;
