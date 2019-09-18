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

export const ModalOverlay = forwardRef(
  (
    {
      isOpen,
      initialFocusRef,
      finalFocusRef,
      onClose,
      lockBodyScroll,
      closeOnEsc,
      closeOnOverlayClick,
      onOpen,
      scrollBoundary,
      returnFocusOnClose,
      parentSelector,
      children,
      onClick,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    const _overlayRef = useForkRef(ref, overlayRef);

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
      returnFocusOnClose,
      parentSelector,
      contentRef,
      overlayRef,
    };

    if (isOpen) {
      return (
        <ModalContext.Provider value={context}>
          <Portal container={mountRef.current}>
            <FocusLock
              returnFocus={returnFocusOnClose}
              onActivation={() => {
                if (initialFocusRef && initialFocusRef.current) {
                  initialFocusRef.current.focus();
                }
              }}
              onDeactivation={() => {
                if (finalFocusRef && finalFocusRef.current) {
                  finalFocusRef.current.focus();
                }
                onClose();
              }}
            >
              <Box
                pos="fixed"
                bg="rgba(0,0,0,0.6)"
                left="0"
                right="0"
                top="0"
                bottom="0"
                zIndex="1"
                overflow="hidden auto"
                padding="3rem"
                onClick={wrapEvent(onClick, event => {
                  event.stopPropagation();
                  onClose();
                })}
                onKeyDown={wrapEvent(onKeyDown, event => {
                  if (event.key === "Escape") {
                    event.stopPropagation();
                    onClose();
                  }
                })}
                ref={_overlayRef}
                {...rest}
              >
                {children}
              </Box>
            </FocusLock>
          </Portal>
        </ModalContext.Provider>
      );
    }
  },
);

export const ModalContent = React.forwardRef(
  ({ onClick, onKeyDown, children, ...props }, ref) => {
    const { contentRef } = useModalContext();
    const _contentRef = useForkRef(ref, contentRef);
    return (
      <Box
        role="dialog"
        aria-modal="true"
        tabIndex={0}
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 24,
          background: "#fff",
          margin: "0 auto",
        }}
        onClick={wrapEvent(onClick, event => event.stopPropagation())}
        ref={_contentRef}
        {...props}
      >
        {children}
      </Box>
    );
  },
);
