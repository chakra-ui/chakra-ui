/** @jsx jsx */
import { jsx } from "@emotion/core";
import CloseButton from "../CloseButton";
import { useUIMode } from "../ThemeProvider";
import { ModalTransition, ModalOverlay, ModalContent } from "./components";

const Modal = ({
  isOpen,
  onClose,
  children,
  showCloseButton,
  size = "md",
  initialFocusRef
}) => {
  const {mode} = useUIMode();
  return (
    <ModalTransition isOpen={isOpen}>
      {styles => (
        <ModalOverlay
          initialFocusRef={initialFocusRef}
          css={{ opacity: styles.opacity }}
          onDismiss={onClose}
        >
          <ModalContent
            mode={mode}
            css={theme => ({
              maxWidth: theme.sizes[size],
              top: 40,
              margin: "0 auto",
              borderRadius: 4,
              transform: `translate3d(0px, ${styles.y}px, 0px)`
            })}
          >
            {children}
            {showCloseButton && (
              <CloseButton
                onClick={onClose}
                position="absolute"
                top="8px"
                right="12px"
              />
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </ModalTransition>
  );
};

export default Modal;
export * from "./components";
