import { IAlert, AlertProps as BaseAlertProps } from "../Alert";
import { BoxProps } from "../Box";
import { Omit } from "../common-types";
import { Position } from "toasted-notes";
import * as React from "react";

type AlertProps = Omit<BaseAlertProps, "position"> & {
  /**
   * One of toasted-notes positions.
   */
  position?: keyof typeof Position;
};

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
  /**
   * Duration before dismiss in milliseconds, or `null` to never dismiss.
   */
  duration?: number | null;
}

export type ToastProps = IToast;

declare const Toast: React.FC<ToastProps>;

export const useToast: () => (props: IToast) => void;

export default Toast;
