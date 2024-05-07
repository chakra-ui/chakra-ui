import {
  Dialog as ArkDialog,
  type DialogBackdropProps as ArkDialogBackdropProps,
  type DialogCloseTriggerProps as ArkDialogCloseTriggerProps,
  type DialogContentProps as ArkDialogContentProps,
  type DialogDescriptionProps as ArkDialogDescriptionProps,
  type DialogPositionerProps as ArkDialogPositionerProps,
  type DialogRootProps as ArkDialogRootProps,
  type DialogTitleProps as ArkDialogTitleProps,
  type DialogTriggerProps as ArkDialogTriggerProps,
} from "@ark-ui/react/dialog"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withRootProvider,
  withContext,
  useStyles: useDialogStyles,
} = createStyleContext("Dialog")

export { useDialogStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface DialogRootProps
  extends ArkDialogRootProps,
    SlotRecipeProps<"Dialog">,
    UnstyledProp {}

export const DialogRoot = withRootProvider<DialogRootProps>(ArkDialog.Root)

////////////////////////////////////////////////////////////////////////////////////

export interface DialogTriggerProps
  extends HTMLChakraProps<"button", ArkDialogTriggerProps> {}

export const DialogTrigger = withContext<HTMLButtonElement, DialogTriggerProps>(
  ArkDialog.Trigger,
  "trigger",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DialogPositionerProps
  extends HTMLChakraProps<"div", ArkDialogPositionerProps> {}

export const DialogPositioner = withContext<
  HTMLDivElement,
  DialogPositionerProps
>(ArkDialog.Positioner, "positioner")

////////////////////////////////////////////////////////////////////////////////////

export interface DialogContentProps
  extends HTMLChakraProps<"section", ArkDialogContentProps> {}

export const DialogContent = withContext<HTMLDivElement, DialogContentProps>(
  ArkDialog.Content,
  "content",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DialogDescriptionProps
  extends HTMLChakraProps<"p", ArkDialogDescriptionProps> {}

export const DialogDescription = withContext<
  HTMLDivElement,
  DialogDescriptionProps
>(ArkDialog.Description, "description")

////////////////////////////////////////////////////////////////////////////////////

export interface DialogTitleProps
  extends HTMLChakraProps<"h2", ArkDialogTitleProps> {}

export const DialogTitle = withContext<HTMLDivElement, DialogTitleProps>(
  ArkDialog.Title,
  "title",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DialogCloseTriggerProps
  extends HTMLChakraProps<"button", ArkDialogCloseTriggerProps> {}

export const DialogCloseTrigger = withContext<
  HTMLButtonElement,
  DialogCloseTriggerProps
>(ArkDialog.CloseTrigger, "closeTrigger")

////////////////////////////////////////////////////////////////////////////////////

export interface DialogBackdropProps
  extends HTMLChakraProps<"div", ArkDialogBackdropProps> {}

export const DialogBackdrop = withContext<HTMLDivElement, DialogBackdropProps>(
  ArkDialog.Backdrop,
  "backdrop",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DialogBodyProps extends HTMLChakraProps<"div"> {}

export const DialogBody = withContext<HTMLDivElement, DialogBodyProps>(
  "div",
  "body",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DialogFooterProps extends HTMLChakraProps<"footer"> {}

export const DialogFooter = withContext<HTMLDivElement, DialogFooterProps>(
  "div",
  "footer",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DialogHeaderProps extends HTMLChakraProps<"div"> {}

export const DialogHeader = withContext<HTMLDivElement, DialogHeaderProps>(
  "div",
  "header",
)
