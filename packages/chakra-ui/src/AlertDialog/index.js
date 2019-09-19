/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ModalTransition } from "../Modal";
import { AlertDialogContent, AlertDialogOverlay } from "./components";

const AlertDialog = ({
  isOpen,
  onClose,
  children,
  size = "md",
  overlayBg,
  zIndex,
  isCentered,
  leastDestructiveRef,
  ...rest
}) => {
  return (
    <ModalTransition isOpen={isOpen}>
      {styles => (
        <AlertDialogOverlay
          bg={overlayBg}
          zIndex={zIndex}
          leastDestructiveRef={leastDestructiveRef}
          css={{
            opacity: styles.opacity,
            ...(isCentered && {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }),
          }}
          onDismiss={onClose}
        >
          <AlertDialogContent
            maxWidth={size}
            rounded="md"
            transform={`translate3d(0px, ${styles.y}px, 0px)`}
            {...(!isCentered && { top: 40, mx: "auto" })}
            {...rest}
          >
            {children}
          </AlertDialogContent>
        </AlertDialogOverlay>
      )}
    </ModalTransition>
  );
};

export default AlertDialog;
export * from "./components";
