/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ModalTransition } from "../Modal/components";
import { AlertDialogContent, AlertDialogOverlay } from "./components";

const AlertDialog = ({
  isOpen,
  onClose,
  children,
  size = "md",
  isCentered,
  leastDestructiveRef,
  ...rest
}) => {
  const centeredProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <ModalTransition isOpen={isOpen}>
      {styles => (
        <AlertDialogOverlay
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
          {...(isCentered && centeredProps)}
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
