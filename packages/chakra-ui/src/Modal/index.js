import React, {
  useRef,
  useEffect,
  createContext,
  useContext,
  forwardRef,
} from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import FocusLock from "react-focus-lock";
import { wrapEvent, useForkRef, getFocusables } from "../utils";
import Box from "../Box";
import Portal from "../Portal";
import CloseButton from "../CloseButton";
import { hideOthers } from "aria-hidden";
import { useId } from "@reach/auto-id";
import { useColorMode } from "../ColorModeProvider";
import { canUseDOM } from "exenv";

////////////////////////////////////////////////////////////////////////

const ModalContext = createContext({});
const useModalContext = () => useContext(ModalContext);

////////////////////////////////////////////////////////////////////////

function useAriaHider({
  isOpen,
  id,
  enableInert,
  container = canUseDOM ? document.body : null,
}) {
  const mountRef = useRef(
    canUseDOM
      ? document.getElementById(id) || document.createElement("div")
      : null,
  );

  useEffect(() => {
    let undoAriaHidden = null;
    let mountNode = mountRef.current;

    if (isOpen && canUseDOM) {
      mountRef.current.id = id;
      container.appendChild(mountRef.current);
      if (enableInert) {
        undoAriaHidden = hideOthers(mountNode);
      }
    }

    return () => {
      if (enableInert && undoAriaHidden != null) {
        undoAriaHidden();
      }
      if (mountNode.parentElement) {
        mountNode.parentElement.removeChild(mountNode);
      }
    };
  }, [isOpen, id, enableInert, container]);

  return mountRef;
}

////////////////////////////////////////////////////////////////////////

const Modal = ({
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
}) => {
  const contentRef = useRef(null);
  const uuid = useId();
  const _id = id || uuid;

  const contentId = formatIds(_id)["content"];
  const headerId = formatIds(_id)["header"];
  const bodyId = formatIds(_id)["body"];

  let addAriaLabelledby = false;
  let addAriaDescribedby = false;

  if (typeof addAriaLabels === "object") {
    addAriaLabelledby = addAriaLabels["header"];
    addAriaDescribedby = addAriaLabels["body"];
  }

  if (typeof addAriaLabels === "boolean") {
    addAriaLabelledby = addAriaLabels;
    addAriaDescribedby = addAriaLabels;
  }

  useEffect(() => {
    const dialogNode = contentRef.current;
    if (isOpen && blockScrollOnMount) {
      disableBodyScroll(dialogNode);
    }
    return () => enableBodyScroll(dialogNode);
  }, [isOpen, blockScrollOnMount]);

  useEffect(() => {
    const func = event => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose(event, "pressedEscape");
      }
    };

    if (isOpen && !closeOnOverlayClick) {
      canUseDOM && document.addEventListener("keydown", func);
    }
    return () => {
      canUseDOM && document.removeEventListener("keydown", func);
    };
  }, [isOpen, onClose, closeOnOverlayClick, closeOnEsc]);

  const mountRef = useAriaHider({
    isOpen,
    id: "chakra-portal",
    enableInert: useInert,
    container,
  });

  const context = {
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
    addAriaLabelledby,
    addAriaDescribedby,
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContext.Provider value={context}>
      <Portal container={mountRef.current}>
        <FocusLock
          returnFocus={returnFocusOnClose && !finalFocusRef}
          onActivation={() => {
            if (initialFocusRef && initialFocusRef.current) {
              initialFocusRef.current.focus();
            } else {
              if (contentRef.current) {
                let focusables = getFocusables(contentRef.current);
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
    </ModalContext.Provider>
  );
};

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
      zIndex="overlay"
      {...props}
    />
  );
});

////////////////////////////////////////////////////////////////////////

const ModalContent = React.forwardRef(
  ({ onClick, children, zIndex = "modal", noStyles, ...props }, ref) => {
    const {
      contentRef,
      onClose,
      isCentered,
      bodyId,
      headerId,
      contentId,
      size,
      closeOnEsc,
      addAriaLabelledby,
      addAriaDescribedby,
      scrollBehavior,
      closeOnOverlayClick,
    } = useModalContext();
    const _contentRef = useForkRef(ref, contentRef);
    const { colorMode } = useColorMode();

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

    const boxStyleProps = colorModeStyles[colorMode];

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
        w="100%"
        h="100%"
        zIndex={zIndex}
        onClick={event => {
          event.stopPropagation();
          if (closeOnOverlayClick) {
            onClose(event, "clickedOverlay");
          }
        }}
        onKeyDown={event => {
          if (event.key === "Escape") {
            event.stopPropagation();
            if (closeOnEsc) {
              onClose(event, "pressedEscape");
            }
          }
        }}
        {...wrapperStyle}
      >
        <Box
          ref={_contentRef}
          as="section"
          // role="dialog"
          aria-modal="true"
          tabIndex={-1}
          outline={0}
          maxWidth={size}
          w="100%"
          id={contentId}
          {...(addAriaDescribedby && { "aria-describedby": bodyId })}
          {...(addAriaLabelledby && { "aria-labelledby": headerId })}
          pos="relative"
          d="flex"
          flexDir="column"
          zIndex={zIndex}
          onClick={wrapEvent(onClick, event => event.stopPropagation())}
          {...boxStyleProps}
          {...contentStyle}
          {...props}
        >
          {children}
        </Box>
      </Box>
    );
  },
);

////////////////////////////////////////////////////////////////////////

const ModalHeader = forwardRef((props, ref) => {
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
      fontWeight="semibold"
      {...props}
    />
  );
});

////////////////////////////////////////////////////////////////////////

const ModalFooter = forwardRef((props, ref) => (
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

const ModalBody = forwardRef((props, ref) => {
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

const ModalCloseButton = forwardRef((props, ref) => {
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
});

////////////////////////////////////////////////////////////////////////

export {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
};
