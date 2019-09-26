import * as React from "react";
import { BoxProps } from "../Box";
import { CloseButtonProps } from "../CloseButton";
import { TransitionProps } from "react-spring/renderprops";

type ModalSizes =
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

export interface IModal {
  container?: React.RefObject<HTMLElement>;
  /**
   * If `true`, the modal when be opened.
   */
  isOpen?: boolean;
  /**
   * Callback invoked to close the modal.
   */
  onClose?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: "pressedEscape" | "clickedOverlay",
  ) => void;
  /**
   * If `true`, scrolling will be disabled on the `body` when the modal opens.
   *  @default true
   */
  blockScrollOnMount?: boolean;
  /**
   * A11y: If `true`, the siblings of the `Modal` will have `aria-hidden`
   * set to `true` so that screen readers can only see the `Modal`.
   *
   * This is commonly known as making the other elements **inert**
   *
   *  @default true
   */
  useInert?: boolean;
  /**
   * The content of the modal.
   */
  children: React.ReactNode;
  /**
   * The size (maxWidth) of the modal.
   */
  size?: ModalSizes | BoxProps["maxWidth"];
  /**
   *  If `true`, the modal will be centered on screen.
   */
  isCentered?: boolean;
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: React.RefObject<HTMLElement>;
  /**
   * Where scroll behaviour should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   */
  scrollBehavior?: "inside" | "outside";
  /**
   * If `true`, the modal will close when the overlay is clicked
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * If `true`, the modal will close when the `Esc` key is pressed
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * The `id` of the modal
   */
  id?: string;
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   */
  returnFocusOnClose?: boolean;
  /**
   * By default, a unique `id` is passed to the header and body.
   * These ids are used to add `aria-labelledby` and `aria-describedby` to the `ModalContent`.
   *
   * You can configure this behavior:
   * - Set it to `false` if you'd like to manually add the `aria-*` attributes.
   * - Set it to `{header: false}` if you don't render the `ModalHeader` within the modal.
   * We'll remove the `aria-labelledby` prop.
   *
   * @default true
   */
  addAriaLabels?: boolean | { header?: boolean; body?: boolean };
  /**
   * The function to format the `id`s passed to the `ModalHeader`, `Modalbody`, and `ModalContent`
   */
  formatIds?: (
    id: string | number,
  ) => { content: string; header: string; body: string };
}

export const Modal: React.FC<IModal>;
export const ModalOverlay: React.FC<BoxProps>;

interface IModalContent {
  onClick?: React.KeyboardEventHandler<HTMLElement>;
  zIndex?: BoxProps["zIndex"];
  children: React.ReactNode;
}

type ModalContentProps = IModalContent & BoxProps;
export const ModalContent: React.FC<ModalContentProps>;
export const ModalHeader: React.FC<BoxProps>;
export const ModalFooter: React.FC<BoxProps>;
export const ModalBody: React.FC<BoxProps>;
export const ModalCloseButton: React.FC<CloseButtonProps>;
