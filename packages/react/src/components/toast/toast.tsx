"use client"

import {
  Toast as ArkToast,
  type ToastCloseTriggerProps as ArkToastCloseTriggerProps,
  type ToastDescriptionProps as ArkToastDescriptionProps,
  type ToastRootProps as ArkToastRootProps,
  type ToastTitleProps as ArkToastTitleProps,
  type CreateToasterProps,
  Toaster,
  type ToasterProps,
  createToaster,
} from "@ark-ui/react/toast"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

export { createToaster, type CreateToasterProps }
export { Toaster, type ToasterProps }

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useToastStyles,
} = createStyleContext("Toast")

export { useToastStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ToastRootProps
  extends ArkToastRootProps,
    SlotRecipeProps<"Toast">,
    UnstyledProp {}

export const ToastRoot = withProvider<HTMLDivElement, ToastRootProps>(
  ArkToast.Root,
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface ToastCloseTriggerProps
  extends HTMLChakraProps<"button", ArkToastCloseTriggerProps> {}

export const ToastCloseTrigger = withContext<
  HTMLButtonElement,
  ToastCloseTriggerProps
>(ArkToast.CloseTrigger, "closeTrigger")

////////////////////////////////////////////////////////////////////////////////////

export interface ToastTitleProps
  extends HTMLChakraProps<"div", ArkToastTitleProps> {}

export const ToastTitle = withContext<HTMLDivElement, ToastTitleProps>(
  ArkToast.Title,
  "title",
)

////////////////////////////////////////////////////////////////////////////////////

export interface ToastDescriptionProps
  extends HTMLChakraProps<"div", ArkToastDescriptionProps> {}

export const ToastDescription = withContext<
  HTMLDivElement,
  ToastDescriptionProps
>(ArkToast.Description, "description")
