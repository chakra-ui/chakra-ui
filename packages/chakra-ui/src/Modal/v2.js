/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useRef,
  forwardRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import FocusLock from "react-focus-lock";
import { wrapEvent, useForkRef } from "../utils";
import Box from "../Box";
import Portal from "../Portal";

const ModalContext = createContext({});
const useModalContext = () => useContext(ModalContext);

function getSiblings(elem) {
  var siblings = [];
  let hasParentNode = elem.parentNode;

  if (hasParentNode) {
    var sibling = elem.parentNode.firstChild;

    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
  }

  return siblings;
}

function useAriaHider({ isOpen, id }) {
  const mountRef = useRef(
    document.getElementById(id) || document.createElement("div"),
  );

  useEffect(() => {
    if (isOpen) {
      mountRef.current.id = id;
      document.body.appendChild(mountRef.current);
    }

    let mountNode = mountRef.current;
    let siblings = getSiblings(mountNode);
    siblings = Array.from(siblings).filter(node => node.tagName !== "SCRIPT");

    const originalAriaHidden = [];

    if (isOpen) {
      siblings.forEach(node => {
        let ariaHidden = node.getAttribute("aria-hidden");
        let alreadyHidden = ariaHidden !== null && ariaHidden !== "false";
        if (!alreadyHidden) {
          originalAriaHidden.push(ariaHidden);
          node.setAttribute("aria-hidden", "true");
        }
      });
    }

    return () => {
      if (mountNode.parentElement) {
        siblings.forEach((node, index) => {
          const nodeAriaHidden = originalAriaHidden[index];
          if (nodeAriaHidden != null) {
            node.setAttribute("aria-hidden", originalAriaHidden[index]);
          } else {
            node.removeAttribute("aria-hidden");
          }
        });
        mountNode.parentElement.removeChild(mountNode);
      }
    };
  }, [isOpen, id]);

  return mountRef;
}

export const Modal = ({
  isOpen,
  initialFocusRef,
  finalFocusRef,
  onClose,
  lockBodyScroll,
  closeOnEsc,
  closeOnOverlayClick,
  onOpen,
  scrollBoundary,
  isCentered,
  returnFocus = true,
  parentSelector,
  children,
}) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const dialogNode = contentRef.current;
    if (isOpen && lockBodyScroll) {
      disableBodyScroll(dialogNode);
    }
    return () => enableBodyScroll(dialogNode);
  }, [isOpen, lockBodyScroll]);

  const mountRef = useAriaHider({ isOpen, id: "chakra-portal" });

  const context = {
    isOpen,
    initialFocusRef,
    onClose,
    lockBodyScroll,
    closeOnEsc,
    closeOnOverlayClick,
    onOpen,
    returnFocus,
    parentSelector,
    contentRef,
    overlayRef,
    scrollBoundary,
    isCentered,
  };

  if (isOpen) {
    return (
      <ModalContext.Provider value={context}>
        <Portal container={mountRef.current}>
          <FocusLock
            returnFocus={returnFocus}
            onActivation={() => {
              if (initialFocusRef && initialFocusRef.current) {
                initialFocusRef.current.focus();
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
  }
};

export const ModalOverlay = React.forwardRef(
  ({ onClick, onKeyDown, ...rest }, ref) => {
    const { overlayRef } = useModalContext();
    const _overlayRef = useForkRef(ref, overlayRef);

    return (
      <Box
        pos="fixed"
        bg="rgba(0,0,0,0.4)"
        left="0"
        top="0"
        w="100vw"
        h="100vh"
        ref={_overlayRef}
        {...rest}
      />
    );
  },
);

export const ModalContent = React.forwardRef(
  ({ onClick, onKeyDown, children, zIndex = 1, ...props }, ref) => {
    const { contentRef, onClose } = useModalContext();
    const _contentRef = useForkRef(ref, contentRef);
    return (
      <Box
        pos="fixed"
        left="0"
        top="0"
        w="100%"
        h="100%"
        zIndex={zIndex}
        overflow="hidden auto"
        onClick={event => {
          event.stopPropagation();
          onClose();
        }}
        onKeyDown={event => {
          if (event.key === "Escape") {
            event.stopPropagation();
            onClose();
          }
        }}
      >
        <Box
          aria-modal="true"
          tabIndex={0}
          maxW="400px"
          w="100%"
          p={6}
          bg="white"
          my="1.75rem"
          mx="auto"
          zIndex={zIndex}
          onClick={wrapEvent(onClick, event => event.stopPropagation())}
          ref={_contentRef}
          {...props}
        >
          {children}
        </Box>
      </Box>
    );
  },
);
