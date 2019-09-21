/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalOverlay,
} from "../Modal";

const formatIds = id => ({
  content: `alert-dialog-${id}`,
  header: `alert-dialog-${id}-label`,
  body: `alert-dialog-${id}-desc`,
});

const AlertDialog = ({ leastDestructiveRef, ...props }) => (
  <Modal
    formatIds={formatIds}
    initialFocusRef={leastDestructiveRef}
    {...props}
  />
);

const AlertDialogContent = forwardRef((props, ref) => (
  <ModalContent ref={ref} role="alertdialog" {...props} />
));

export {
  AlertDialog,
  AlertDialogContent,
  ModalOverlay as AlertDialogOverlay,
  ModalBody as AlertDialogBody,
  ModalHeader as AlertDialogHeader,
  ModalFooter as AlertDialogFooter,
};
