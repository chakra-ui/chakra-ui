import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalProps,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/modal"
import * as React from "react"
import { forwardRef } from "@chakra-ui/system"

export interface AlertDialogProps extends Omit<ModalProps, "initialFocusRef"> {
  leastDestructiveRef: ModalProps["initialFocusRef"]
}

export const AlertDialog: React.FC<AlertDialogProps> = (props) => {
  const { leastDestructiveRef, ...rest } = props
  return <Modal {...rest} initialFocusRef={leastDestructiveRef} />
}

export const AlertDialogContent: React.FC<ModalContentProps> = forwardRef(
  (props, ref) => {
    return <ModalContent ref={ref} role="alertdialog" {...(props as any)} />
  },
)

export const AlertDialogBody = ModalBody
export const AlertDialogHeader = ModalHeader
export const AlertDialogFooter = ModalFooter
export const AlertDialogCloseButton = ModalCloseButton
export const AlertDialogOverlay = ModalOverlay
