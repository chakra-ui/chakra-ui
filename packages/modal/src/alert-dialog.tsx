import { forwardRef } from "@chakra-ui/system"
import * as React from "react"
import { Modal, ModalContent, ModalContentProps, ModalProps } from "./modal"

export interface AlertDialogProps extends Omit<ModalProps, "initialFocusRef"> {
  leastDestructiveRef: ModalProps["initialFocusRef"]
}

export function AlertDialog(props: AlertDialogProps) {
  const { leastDestructiveRef, ...rest } = props
  return <Modal {...rest} initialFocusRef={leastDestructiveRef} />
}

export const AlertDialogContent = forwardRef<ModalContentProps, "section">(
  function AlertDialogContent(props, ref) {
    return <ModalContent ref={ref} role="alertdialog" {...props} />
  },
)

export {
  ModalBody as AlertDialogBody,
  ModalCloseButton as AlertDialogCloseButton,
  ModalFooter as AlertDialogFooter,
  ModalHeader as AlertDialogHeader,
  ModalOverlay as AlertDialogOverlay,
} from "./modal"
