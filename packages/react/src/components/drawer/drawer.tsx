"use client"

import type { Assign } from "@ark-ui/react"
import { Dialog as ArkDialog, useDialogContext } from "@ark-ui/react/dialog"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withRootProvider,
  withContext,
  useStyles: useDrawerStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "drawer" })

export { useDrawerStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerRootProviderBaseProps
  extends
    Assign<ArkDialog.RootProviderBaseProps, SlotRecipeProps<"drawer">>,
    UnstyledProp {}

export interface DrawerRootProviderProps extends DrawerRootProviderBaseProps {
  children: React.ReactNode
}

export const DrawerRootProvider = withRootProvider<DrawerRootProviderProps>(
  ArkDialog.RootProvider,
  {
    defaultProps: { unmountOnExit: true, lazyMount: true },
  },
)
DrawerRootProvider.displayName = "DrawerRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerRootBaseProps
  extends
    Assign<ArkDialog.RootBaseProps, SlotRecipeProps<"drawer">>,
    UnstyledProp {}

export interface DrawerRootProps extends DrawerRootBaseProps {
  children: React.ReactNode
}

export const DrawerRoot = withRootProvider<DrawerRootProps>(ArkDialog.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
DrawerRoot.displayName = "DrawerRoot"

////////////////////////////////////////////////////////////////////////////////////

export const DrawerRootPropsProvider =
  PropsProvider as React.Provider<DrawerRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerTriggerProps
  extends HTMLChakraProps<"button", ArkDialog.TriggerBaseProps>, UnstyledProp {}

export const DrawerTrigger = withContext<HTMLButtonElement, DrawerTriggerProps>(
  ArkDialog.Trigger,
  "trigger",
  { forwardAsChild: true },
)
DrawerTrigger.displayName = "DrawerTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerPositionerProps
  extends HTMLChakraProps<"div", ArkDialog.PositionerBaseProps>, UnstyledProp {}

export const DrawerPositioner = withContext<
  HTMLDivElement,
  DrawerPositionerProps
>(ArkDialog.Positioner, "positioner", { forwardAsChild: true })
DrawerPositioner.displayName = "DrawerPositioner"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerContentProps
  extends
    HTMLChakraProps<"section", ArkDialog.ContentBaseProps>,
    UnstyledProp {}

export const DrawerContent = withContext<HTMLDivElement, DrawerContentProps>(
  ArkDialog.Content,
  "content",
  { forwardAsChild: true },
)
DrawerContent.displayName = "DrawerContent"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerDescriptionProps
  extends HTMLChakraProps<"p", ArkDialog.DescriptionBaseProps>, UnstyledProp {}

export const DrawerDescription = withContext<
  HTMLDivElement,
  DrawerDescriptionProps
>(ArkDialog.Description, "description", { forwardAsChild: true })
DrawerDescription.displayName = "DrawerDescription"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerTitleProps
  extends HTMLChakraProps<"h2", ArkDialog.TitleBaseProps>, UnstyledProp {}

export const DrawerTitle = withContext<HTMLDivElement, DrawerTitleProps>(
  ArkDialog.Title,
  "title",
  { forwardAsChild: true },
)
DrawerTitle.displayName = "DrawerTitle"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerCloseTriggerProps
  extends
    HTMLChakraProps<"button", ArkDialog.CloseTriggerBaseProps>,
    UnstyledProp {}

export const DrawerCloseTrigger = withContext<
  HTMLButtonElement,
  DrawerCloseTriggerProps
>(ArkDialog.CloseTrigger, "closeTrigger", { forwardAsChild: true })
DrawerCloseTrigger.displayName = "DrawerCloseTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerActionTriggerProps extends HTMLChakraProps<"button"> {}

export const DrawerActionTrigger = forwardRef<
  HTMLButtonElement,
  DrawerActionTriggerProps
>(function DrawerActionTrigger(props, ref) {
  const drawer = useDialogContext()
  return (
    <chakra.button {...props} ref={ref} onClick={() => drawer.setOpen(false)} />
  )
})
DrawerActionTrigger.displayName = "DrawerActionTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerBackdropProps
  extends HTMLChakraProps<"div", ArkDialog.BackdropBaseProps>, UnstyledProp {}

export const DrawerBackdrop = withContext<HTMLDivElement, DrawerBackdropProps>(
  ArkDialog.Backdrop,
  "backdrop",
  { forwardAsChild: true },
)
DrawerBackdrop.displayName = "DrawerBackdrop"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerBodyProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const DrawerBody = withContext<HTMLDivElement, DrawerBodyProps>(
  "div",
  "body",
)
DrawerBody.displayName = "DrawerBody"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerFooterProps
  extends HTMLChakraProps<"footer">, UnstyledProp {}

export const DrawerFooter = withContext<HTMLDivElement, DrawerFooterProps>(
  "div",
  "footer",
)
DrawerFooter.displayName = "DrawerFooter"

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerHeaderProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const DrawerHeader = withContext<HTMLDivElement, DrawerHeaderProps>(
  "div",
  "header",
)
DrawerHeader.displayName = "DrawerHeader"

////////////////////////////////////////////////////////////////////////////////////

export const DrawerContext = ArkDialog.Context

export interface DrawerOpenChangeDetails extends ArkDialog.OpenChangeDetails {}
