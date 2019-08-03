import * as React from "react";
import { BoxProps } from "../Box";

export interface IModal {
  /**
   * If `true`, the modal is shown.
   */
  isOpen?: boolean;
  /**
   * Callback invoked when user closes the modal.
   */
  onClose?: () => void;
  /**
   * Callback invoked when user closes the modal.
   */
  children: React.ReactNode;
  /**
   * The size of the modal.
   */
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
  /**
   *  If `true`, the modal will be centered on screen.
   */
  isCentered?: boolean;
  /**
   * The ref to the initial element to receiver focus when the modal opens.
   */
  initialFocusRef?: React.Ref<{}>;
}
export type ModalProps = IModal & BoxProps;
declare const Modal: React.FC<ModalProps>;
export default Modal;

export const ModalHeader: React.FC<BoxProps>;
export const ModalFooter: React.FC<BoxProps>;
export const ModalOverlay: React.ForwardRefExoticComponent<
  BoxProps & React.RefAttributes<HTMLDivElement>
>;
export const ModalContent: React.ForwardRefExoticComponent<
  BoxProps & React.RefAttributes<HTMLDivElement>
>;

export interface IModalTransition {
  isOpen: boolean;
  children: React.ReactNode;
  duration: number;
}
export const ModalTransition: React.FC<IModalTransition>;
