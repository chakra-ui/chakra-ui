import {
  useCreateContext,
  useLockBodyScroll,
  useAriaHidden,
  useId,
  useFocusTrap,
} from "@chakra-ui/hooks";
import { BoxProps } from "../Box";
import * as React from "react";
import { canUseDOM } from "exenv";
import { getAllFocusables, mergeRefs } from "@chakra-ui/utils";
import { Portal } from "../Portal";

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

export interface ModalOptions {
  container?: HTMLElement;
  /**
   * If `true`, the modal when be opened.
   */
  isOpen?: boolean;
  /**
   * Callback invoked to close the modal.
   */
  onClose?: (
    event: MouseEvent | KeyboardEvent,
    reason?: "pressed-escape" | "clicked-overlay",
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
   * If `true`, a `padding-right` will be applied to the body element
   * that's equal to the width of the scrollbar.
   *
   * This can help prevent some unpleasant flickering effect
   * and content adjustment when the modal opens
   */
  preserveScrollBarGap?: boolean;
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

interface ModalContentOptions {
  onClick?: React.KeyboardEventHandler<HTMLElement>;
  zIndex?: BoxProps["zIndex"];
  children: React.ReactNode;
}

interface ContextValue extends Partial<Required<ModalOptions>> {
  contentRef: React.Ref<HTMLElement | undefined>;
  headerId: string;
  bodyId: string;
  contentId: string;
}

const [useModalContext, ModalContextProvider] = useCreateContext<
  ContextValue
>();

function Modal({
  isOpen,
  initialFocusRef,
  finalFocusRef,
  onClose,
  blockScrollOnMount = true,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  useInert = true,
  scrollBehavior = "outside",
  isCentered,
  addAriaLabels = true,
  preserveScrollBarGap,
  formatIds = id => ({
    content: `modal-${id}`,
    header: `modal-${id}-header`,
    body: `modal-${id}-body`,
  }),
  container,
  returnFocusOnClose = true,
  children,
  id,
  size = "md",
}: ModalOptions) {
  const contentRef = useLockBodyScroll({
    isEnabled: isOpen && blockScrollOnMount,
    preserveScrollBarGap,
  });

  const mountRef = useAriaHidden({
    isOpen,
    id: "chakra-portal",
    isEnabled: useInert,
    container,
  });

  const focusTrap = useFocusTrap({
    shouldReturnFocus: returnFocusOnClose,
    onActivate: () => {
      if (initialFocusRef && initialFocusRef.current) {
        initialFocusRef.current.focus();
      } else {
        if (contentRef.current) {
          let focusables = getAllFocusables(contentRef.current);
          if (focusables.length === 0) {
            contentRef.current.focus();
          }
        }
      }
    },
    onDeactivate: () => {
      if (finalFocusRef && finalFocusRef.current) {
        finalFocusRef.current.focus();
      }
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      focusTrap.activate();
    }
    return () => {
      focusTrap.deactivate();
    };
  }, [isOpen]);

  React.useEffect(() => {
    const func = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose && onClose(event, "pressed-escape");
      }
    };

    if (isOpen && !closeOnOverlayClick) {
      canUseDOM && document.addEventListener("keydown", func);
    }
    return () => {
      canUseDOM && document.removeEventListener("keydown", func);
    };
  }, [isOpen, onClose, closeOnOverlayClick, closeOnEsc]);

  const uuid = useId();
  const _id = id || uuid;

  const contentId = formatIds(_id)["content"];
  const headerId = formatIds(_id)["header"];
  const bodyId = formatIds(_id)["body"];

  const _contentRef = mergeRefs(focusTrap.ref, contentRef);

  return (
    <ModalContextProvider
      value={{
        isOpen,
        initialFocusRef,
        onClose,
        blockScrollOnMount,
        closeOnEsc,
        closeOnOverlayClick,
        returnFocusOnClose,
        contentRef: _contentRef,
        scrollBehavior,
        isCentered,
        headerId,
        bodyId,
        contentId,
        size,
      }}
    >
      <Portal container={mountRef.current}>{children}</Portal>
    </ModalContextProvider>
  );
}
