import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalProps,
} from "@chakra-ui/modal"
import * as React from "react"

export interface AlertDialogProps extends Omit<ModalProps, "initialFocusRef"> {
  leastDestructiveRef: ModalProps["initialFocusRef"]
}

export function AlertDialog(props: AlertDialogProps) {
  const { leastDestructiveRef, ...rest } = props
  return <Modal {...rest} initialFocusRef={leastDestructiveRef} />
}

export const AlertDialogContent = React.forwardRef(function AlertDialogContent(
  props: ModalContentProps,
  ref: React.Ref<any>,
) {
  return <ModalContent ref={ref} role="alertdialog" {...(props as any)} />
})

import {
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/modal"

export const AlertDialogBody = ModalBody
export const AlertDialogHeader = ModalHeader
export const AlertDialogFooter = ModalFooter
export const AlertDialogCloseButton = ModalCloseButton
export const AlertDialogOverlay = ModalOverlay
