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
import React, { Ref, forwardRef } from "react"

export interface AlertDialogProps extends Omit<ModalProps, "initialFocusRef"> {
  leastDestructiveRef: ModalProps["initialFocusRef"]
}

export function AlertDialog(props: AlertDialogProps) {
  const { leastDestructiveRef, ...rest } = props
  return <Modal {...rest} initialFocusRef={leastDestructiveRef} />
}

export const AlertDialogContent = forwardRef(function AlertDialogContent(
  props: ModalContentProps,
  ref: Ref<HTMLElement>,
) {
  return <ModalContent ref={ref} role="alertdialog" {...props} />
})

export const AlertDialogBody = ModalBody
export const AlertDialogHeader = ModalHeader
export const AlertDialogFooter = ModalFooter
export const AlertDialogCloseButton = ModalCloseButton
export const AlertDialogOverlay = ModalOverlay
