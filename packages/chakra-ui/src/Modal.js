/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  DialogContent as ModalContent,
  DialogOverlay as ModalOverlay
} from "./DialogComponents";
import CloseButton from "./CloseButton";
import { Transition } from "react-spring/renderprops";
import { useUIMode } from "./ThemeProvider";

export const ModalTransition = ({ isOpen, duration = 150, children }) => {
  return (
    <Transition
      items={isOpen}
      from={{ opacity: 0, y: 10 }}
      enter={{ opacity: 1, y: 0 }}
      leave={{ opacity: 0, y: -10 }}
      config={{ duration }}
    >
      {isOpen => isOpen && (styles => children(styles))}
    </Transition>
  );
};

const Modal = ({
  isOpen,
  onClose,
  children,
  showCloseButton,
  size = "md",
  initialFocusRef
}) => {
  const mode = useUIMode();
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
