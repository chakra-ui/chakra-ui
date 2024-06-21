"use client"

import { Dialog as ArkDialog } from "@ark-ui/react/dialog"
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
} = createStyleContext("drawer")

export { useDrawerStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerRootProps
  extends ArkDialog.RootBaseProps,
    SlotRecipeProps<"drawer">,
    UnstyledProp {
  children: React.ReactNode
}

export const DrawerRoot = withRootProvider<DrawerRootProps>(ArkDialog.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerTriggerProps
  extends HTMLChakraProps<"button", ArkDialog.TriggerBaseProps> {}

export const DrawerTrigger = withContext<HTMLButtonElement, DrawerTriggerProps>(
  ArkDialog.Trigger,
  "trigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerPositionerProps
  extends HTMLChakraProps<"div", ArkDialog.PositionerBaseProps> {}

export const DrawerPositioner = withContext<
  HTMLDivElement,
  DrawerPositionerProps
>(ArkDialog.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerContentProps
  extends HTMLChakraProps<"section", ArkDialog.ContentBaseProps> {}

export const DrawerContent = withContext<HTMLDivElement, DrawerContentProps>(
  ArkDialog.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerDescriptionProps
  extends HTMLChakraProps<"p", ArkDialog.DescriptionBaseProps> {}

export const DrawerDescription = withContext<
  HTMLDivElement,
  DrawerDescriptionProps
>(ArkDialog.Description, "description", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerTitleProps
  extends HTMLChakraProps<"h2", ArkDialog.TitleBaseProps> {}

export const DrawerTitle = withContext<HTMLDivElement, DrawerTitleProps>(
  ArkDialog.Title,
  "title",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerCloseTriggerProps
  extends HTMLChakraProps<"button", ArkDialog.CloseTriggerBaseProps> {}

export const DrawerCloseTrigger = withContext<
  HTMLButtonElement,
  DrawerCloseTriggerProps
>(ArkDialog.CloseTrigger, "closeTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerBackdropProps
  extends HTMLChakraProps<"div", ArkDialog.BackdropBaseProps> {}

export const DrawerBackdrop = withContext<HTMLDivElement, DrawerBackdropProps>(
  ArkDialog.Backdrop,
  "backdrop",
  { forwardAsChild: true },
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
