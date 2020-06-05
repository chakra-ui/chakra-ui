import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalProps,
} from "@chakra-ui/modal"
import * as React from "react"

export type AlertDialogProps = Omit<ModalProps, "initialFocusRef"> & {
  leastDestructiveRef: ModalProps["initialFocusRef"]
}

export function AlertDialog(props: AlertDialogProps) {
  const { leastDestructiveRef, ...rest } = props
  return <Modal {...rest} initialFocusRef={leastDestructiveRef} />
}

export const AlertDialogContent = React.forwardRef(
  (props: ModalContentProps, ref: React.Ref<any>) => (
    <ModalContent ref={ref} role="alertdialog" {...props} />
  ),
)

export {
  ModalBody as AlertDialogBody,
  ModalCloseButton as AlertDialogCloseButton,
  ModalFooter as AlertDialogFooter,
  ModalHeader as AlertDialogHeader,
  ModalOverlay as AlertDialogOverlay,
} from "@chakra-ui/modal"
