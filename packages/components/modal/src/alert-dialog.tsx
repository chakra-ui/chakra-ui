import { forwardRef } from "@chakra-ui/system"
import { ModalProps, Modal } from "./modal"
import { ModalContentProps, ModalContent } from "./modal-content"

export interface AlertDialogProps extends Omit<ModalProps, "initialFocusRef"> {
  leastDestructiveRef: NonNullable<ModalProps["initialFocusRef"]>
}

export function AlertDialog(props: AlertDialogProps) {
  const { leastDestructiveRef, ...rest } = props
  return <Modal {...rest} initialFocusRef={leastDestructiveRef} />
}

export const AlertDialogContent = forwardRef<ModalContentProps, "section">(
  (props, ref) => <ModalContent ref={ref} role="alertdialog" {...props} />,
)

export { ModalBody as AlertDialogBody } from "./modal-body"
export { ModalCloseButton as AlertDialogCloseButton } from "./modal-close-button"
export { ModalFooter as AlertDialogFooter } from "./modal-footer"
export { ModalHeader as AlertDialogHeader } from "./modal-header"
export { ModalOverlay as AlertDialogOverlay } from "./modal-overlay"
