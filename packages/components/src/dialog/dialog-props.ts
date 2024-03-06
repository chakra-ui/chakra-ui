import { createProps, splitProps } from "@chakra-ui/utils"
import { UseDialogProps } from "./use-dialog"

export const dialogProps = createProps<UseDialogProps>()([
  "closeOnEsc",
  "closeOnOverlayClick",
  "id",
  "open",
  "onClose",
  "onEsc",
  "onOverlayClick",
  "role",
  "useInert",
])

export const splitDialogProps = <T extends UseDialogProps>(props: T) => {
  return splitProps(props, dialogProps) as [
    UseDialogProps,
    Omit<T, keyof UseDialogProps>,
  ]
}
