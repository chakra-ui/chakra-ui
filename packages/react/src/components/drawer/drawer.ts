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
  useStyles: useDrawerStyles,
} = createStyleContext("Drawer")

export { useDrawerStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerRootProps
  extends ArkDialogRootProps,
    SlotRecipeProps<"Drawer">,
    UnstyledProp {}

export const DrawerRoot = withRootProvider<DrawerRootProps>(ArkDialog.Root)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerTriggerProps
  extends HTMLChakraProps<"button", ArkDialogTriggerProps> {}

export const DrawerTrigger = withContext<HTMLButtonElement, DrawerTriggerProps>(
  ArkDialog.Trigger,
  "trigger",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerPositionerProps
  extends HTMLChakraProps<"div", ArkDialogPositionerProps> {}

export const DrawerPositioner = withContext<
  HTMLDivElement,
  DrawerPositionerProps
>(ArkDialog.Positioner, "positioner")

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerContentProps
  extends HTMLChakraProps<"section", ArkDialogContentProps> {}

export const DrawerContent = withContext<HTMLDivElement, DrawerContentProps>(
  ArkDialog.Content,
  "content",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerDescriptionProps
  extends HTMLChakraProps<"p", ArkDialogDescriptionProps> {}

export const DrawerDescription = withContext<
  HTMLDivElement,
  DrawerDescriptionProps
>(ArkDialog.Description, "description")

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerTitleProps
  extends HTMLChakraProps<"h2", ArkDialogTitleProps> {}

export const DrawerTitle = withContext<HTMLDivElement, DrawerTitleProps>(
  ArkDialog.Title,
  "title",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerCloseTriggerProps
  extends HTMLChakraProps<"button", ArkDialogCloseTriggerProps> {}

export const DrawerCloseTrigger = withContext<
  HTMLButtonElement,
  DrawerCloseTriggerProps
>(ArkDialog.CloseTrigger, "closeTrigger")

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerBackdropProps
  extends HTMLChakraProps<"div", ArkDialogBackdropProps> {}

export const DrawerBackdrop = withContext<HTMLDivElement, DrawerBackdropProps>(
  ArkDialog.Backdrop,
  "backdrop",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerBodyProps extends HTMLChakraProps<"div"> {}

export const DrawerBody = withContext<HTMLDivElement, DrawerBodyProps>(
  "div",
  "body",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerFooterProps extends HTMLChakraProps<"footer"> {}

export const DrawerFooter = withContext<HTMLDivElement, DrawerFooterProps>(
  "div",
  "footer",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerHeaderProps extends HTMLChakraProps<"div"> {}

export const DrawerHeader = withContext<HTMLDivElement, DrawerHeaderProps>(
  "div",
  "header",
)
