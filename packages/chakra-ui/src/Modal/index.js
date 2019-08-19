/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ModalTransition, ModalOverlay, ModalContent } from "./components";

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "md",
  isCentered,
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
          onClick={() => {}}
          initialFocusRef={initialFocusRef}
          css={[
            {
              opacity: styles.opacity,
            },
            isCentered && centeredStyle,
          ]}
          onDismiss={onClose}
        >
          <ModalContent
            css={({ sizes, radii }) => ({
              ...(!isCentered && { top: 40, margin: "0 auto" }),
              maxWidth: sizes[size],
              borderRadius: radii.md,
              transform: `translate3d(0px, ${styles.y}px, 0px)`,
            })}
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
