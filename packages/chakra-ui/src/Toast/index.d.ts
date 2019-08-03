import { IAlert, AlertProps } from "../Alert";
import { BoxProps } from "../Box";
import * as React from "react";

export interface IToast extends AlertProps {
  /**
   * The title of the toast.
   */
  title?: string;
  /**
   * If `true` adds a close button to the toast.
   */
  isClosable?: boolean;
  /**
   * Callback function to close the toast.
   */
  onClose?: () => void;
  /**
   * The description of the toast
   */
  description?: string;
}

export type ToastProps = IToast;

declare const Toast: React.FC<ToastProps>;

export default Toast;
