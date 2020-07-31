import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalProps,
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

export {
  ModalBody as AlertDialogBody,
  ModalHeader as AlertDialogHeader,
  ModalFooter as AlertDialogFooter,
  ModalCloseButton as AlertDialogCloseButton,
  ModalOverlay as AlertDialogOverlay,
} from "@chakra-ui/modal"
