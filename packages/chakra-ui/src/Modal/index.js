/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ModalTransition, ModalOverlay, ModalContent } from "./components";

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "md",
  isCentered,
  zIndex,
  overlayBg,
  initialFocusRef,
  ...rest
}) => {
  const centeredStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <ModalTransition isOpen={isOpen}>
      {styles => (
        <ModalOverlay
          initialFocusRef={initialFocusRef}
          opacity={styles.opacity}
          overlayBg={overlayBg}
          zIndex={zIndex}
          css={isCentered && centeredStyle}
          onDismiss={onClose}
        >
          <ModalContent
            maxWidth={size}
            rounded="md"
            transform={`translate3d(0px, ${styles.y}px, 0px)`}
            {...(!isCentered && { top: 40, mx: "auto" })}
            {...rest}
          >
            {children}
          </ModalContent>
        </ModalOverlay>
      )}
    </ModalTransition>
  );
};

export default Modal;
export * from "./components";
