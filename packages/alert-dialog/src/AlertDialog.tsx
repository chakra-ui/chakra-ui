import {
  Dialog,
  DialogProps,
  DialogContent,
  DialogContentProps,
} from "@chakra-ui/dialog"
import * as React from "react"

export type AlertDialogProps = Omit<DialogProps, "initialFocusRef"> & {
  leastDestructiveRef: DialogProps["initialFocusRef"]
}

export function AlertDialog(props: AlertDialogProps) {
  const { leastDestructiveRef, ...rest } = props
  return <Dialog {...rest} initialFocusRef={leastDestructiveRef} />
}

export const AlertDialogContent = React.forwardRef(
  (props: DialogContentProps, ref: React.Ref<any>) => (
    <DialogContent ref={ref} role="alertdialog" {...props} />
  ),
)

export {
  DialogBody as AlertDialogBody,
  DialogCloseButton as AlertDialogCloseButton,
  DialogFooter as AlertDialogFooter,
  DialogHeader as AlertDialogHeader,
  DialogOverlay as AlertDialogOverlay,
} from "@chakra-ui/dialog"
