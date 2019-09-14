import { IAlert, AlertProps as BaseAlertProps } from "../Alert";
import { BoxProps } from "../Box";
import { Omit } from "../common-types";
import { Position } from "toasted-notes";
import * as React from "react";

export interface IToast extends IAlert {
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
  /**
   * One of toasted-notes positions.
   */
  position?: keyof typeof Position;
}

interface RenderOption {
  render: (props: { onClose: () => void; id: string }) => React.ReactNode;
}
export type useToastOptions = IToast & RenderOption;
declare const useToast: () => (props: useToastOptions) => void;

export default useToast;
