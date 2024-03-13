import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseDialogProps } from "./use-dialog"

export const dialogProps = createProps<UseDialogProps>()([
  "closeOnEsc",
  "closeOnOverlayClick",
  "id",
  "isOpen",
  "onClose",
  "onEsc",
  "onOverlayClick",
  "role",
  "useInert",
])

export const splitDialogProps = createSplitProps<UseDialogProps>(dialogProps)
