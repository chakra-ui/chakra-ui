import {
  useAriaHidden,
  useCreateContext,
  useId,
  useLockBodyScroll,
} from "@chakra-ui/hooks";
import {
  getAllFocusables,
  Merge,
  composeEventHandlers,
  canUseDOM,
} from "@chakra-ui/utils";
import * as React from "react";
import FocusLock from "react-focus-lock";
import { Box, BoxProps } from "@chakra-ui/layout";
import { CloseButton, CloseButtonProps } from "../CloseButton";
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

type CloseReason = "pressed-escape" | "clicked-overlay";

export interface ModalOptions {
  container?: HTMLElement;
  /**
   * If `true`, the modal when be opened.
   */
  isOpen?: boolean;
  /**
   * Callback invoked to close the modal.
   */
  onClose?: (event: any, reason?: CloseReason) => void;
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
  contentRef: React.Ref<HTMLElement>;
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
    isEnabled: isOpen,
    preserveScrollBarGap,
  });

  const mountRef = useAriaHidden({
    isEnabled: isOpen && useInert,
    id: "chakra-portal",
    container,
  });

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

  if (!isOpen) {
    return null;
  }

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
        contentRef,
        scrollBehavior,
        isCentered,
        headerId,
        bodyId,
        contentId,
        size,
      }}
    >
      <Portal container={mountRef.current}>
        <FocusLock
          returnFocus={returnFocusOnClose && !finalFocusRef}
          onActivation={() => {
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
          }}
          onDeactivation={() => {
            if (finalFocusRef && finalFocusRef.current) {
              finalFocusRef.current.focus();
            }
          }}
        >
          {children}
        </FocusLock>
      </Portal>
    </ModalContextProvider>
  );
}

////////////////////////////////////////////////////////////////////////

const ModalOverlay = React.forwardRef((props, ref) => {
  return (
    <Box
      pos="fixed"
      bg="rgba(0,0,0,0.4)"
      left="0"
      top="0"
      w="100vw"
      h="100vh"
      ref={ref}
      // zIndex="overlay"
      {...props}
    />
  );
});

////////////////////////////////////////////////////////////////////////

interface ModalContent {
  onClick?: React.MouseEventHandler<HTMLElement>;
  zIndex?: BoxProps["zIndex"];
  children: React.ReactNode;
  noStyles?: boolean;
}

type ModalContentProps = Merge<BoxProps, ModalContent>;

const ModalContent = React.forwardRef<HTMLElement, ModalContentProps>(function(
  { onClick, children, zIndex = "modal", noStyles, ...props },
  ref,
) {
  const {
    contentRef,
    onClose,
    isCentered,
    bodyId,
    headerId,
    contentId,
    size,
    closeOnEsc,
    // addAriaLabelledby,
    // addAriaDescribedby,
    scrollBehavior,
    closeOnOverlayClick,
  } = useModalContext();

  // const { colorMode } = useColorMode();

  const colorModeStyles = {
    light: {
      bg: "white",
      shadow: "0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)",
    },
    dark: {
      bg: "gray.700",
      shadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
    },
  };

  // const boxStyleProps = colorModeStyles[colorMode];

  let wrapperStyle = {};
  let contentStyle = {};

  if (isCentered) {
    wrapperStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  } else {
    contentStyle = {
      top: "3.75rem",
      mx: "auto",
    };
  }

  if (scrollBehavior === "inside") {
    wrapperStyle = {
      ...wrapperStyle,
      maxHeight: "calc(100vh - 7.5rem)",
      overflow: "hidden",
      top: "3.75rem",
    };

    contentStyle = {
      ...contentStyle,
      height: "100%",
      top: 0,
    };
  }

  if (scrollBehavior === "outside") {
    wrapperStyle = {
      ...wrapperStyle,
      overflowY: "auto",
      overflowX: "hidden",
    };

    contentStyle = {
      ...contentStyle,
      my: "3.75rem",
      top: 0,
    };
  }

  if (noStyles) {
    wrapperStyle = {};
    contentStyle = {};
  }

  return (
    <Box
      pos="fixed"
      left="0"
      top="0"
      size="100%"
      // zIndex={zIndex}
      onClick={event => {
        event.stopPropagation();
        if (closeOnOverlayClick && onClose) {
          onClose(event, "clicked-overlay");
        }
      }}
      onKeyDown={event => {
        if (event.key === "Escape") {
          event.stopPropagation();
          if (closeOnEsc && onClose) {
            onClose(event, "pressed-escape");
          }
        }
      }}
      {...wrapperStyle}
    >
      <Box
        ref={contentRef}
        as="section"
        // role="dialog"
        aria-modal="true"
        tabIndex={-1}
        outline={0}
        maxWidth={size}
        width="100%"
        id={contentId}
        // {...(addAriaDescribedby && { "aria-describedby": bodyId })}
        // {...(addAriaLabelledby && { "aria-labelledby": headerId })}
        position="relative"
        display="flex"
        flexDirection="column"
        // zIndex={zIndex}
        onClick={composeEventHandlers(
          event => event.stopPropagation(),
          onClick,
        )}
        // {...boxStyleProps}
        bg="white"
        zIndex={50}
        {...contentStyle}
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
});

////////////////////////////////////////////////////////////////////////

const ModalHeader = React.forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { headerId } = useModalContext();
  return (
    <Box
      ref={ref}
      px={6}
      py={4}
      id={headerId}
      as="header"
      position="relative"
      fontSize="xl"
      // fontWeight="semibold"
      {...props}
    />
  );
});

////////////////////////////////////////////////////////////////////////

const ModalFooter = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box
    display="flex"
    justifyContent="flex-end"
    ref={ref}
    px={6}
    py={4}
    as="footer"
    {...props}
  />
));

////////////////////////////////////////////////////////////////////////

const ModalBody = React.forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { bodyId, scrollBehavior } = useModalContext();

  let style = {};
  if (scrollBehavior === "inside") {
    style = { overflowY: "auto" };
  }

  return (
    <Box ref={ref} id={bodyId} px={6} py={2} flex="1" {...style} {...props} />
  );
});

////////////////////////////////////////////////////////////////////////

const ModalCloseButton = React.forwardRef<HTMLElement, CloseButtonProps>(
  (props, ref) => {
    const { onClose } = useModalContext();
    return (
      <CloseButton
        ref={ref}
        onClick={onClose}
        position="absolute"
        top="8px"
        right="12px"
        {...props}
      />
    );
  },
);

export {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
};
