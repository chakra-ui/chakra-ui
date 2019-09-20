/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import { createContext, useContext, forwardRef } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "../Modal";

const AlertDialogContext = createContext({});
const useAlertDialogContext = () => useContext(AlertDialogContext);

const AlertDialog = ({ leastDestructiveRef, ...props }) => {
  const uuid = useId();
  const labelId = `alert-dialog-${uuid}-label`;
  const descriptionId = `alert-dialog-${uuid}-desc`;

  return (
    <AlertDialogContext.Provider value={{ id: uuid, labelId, descriptionId }}>
      <Modal initialFocusRef={leastDestructiveRef} {...props} />
    </AlertDialogContext.Provider>
  );
};

const AlertDialogContent = forwardRef((props, ref) => {
  const { labelId } = useAlertDialogContext();
  return (
    <ModalContent
      ref={ref}
      role="alertdialog"
      aria-labelledby={labelId}
      {...props}
    />
  );
});

const AlertDialogHeader = forwardRef((props, ref) => {
  const { labelId } = useAlertDialogContext();
  return <ModalHeader ref={ref} id={labelId} {...props} />;
});

const AlertDialogBody = forwardRef((props, ref) => {
  const { descriptionId } = useAlertDialogContext();
  return <ModalBody ref={ref} id={descriptionId} {...props} />;
});

export {
  AlertDialog,
  AlertDialogContent,
  ModalOverlay as AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogHeader,
  ModalFooter as AlertDialogFooter,
};
