"use client"

import {
  Toast as ArkToast,
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
} = createStyleContext("toast")

export { useToastStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ToastRootProps
  extends ArkToast.RootProps,
    SlotRecipeProps<"toast">,
    UnstyledProp {}

export const ToastRoot = withProvider<HTMLDivElement, ToastRootProps>(
  ArkToast.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ToastCloseTriggerProps
  extends HTMLChakraProps<"button", ArkToast.CloseTriggerProps> {}

export const ToastCloseTrigger = withContext<
  HTMLButtonElement,
  ToastCloseTriggerProps
>(ArkToast.CloseTrigger, "closeTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ToastTitleProps
  extends HTMLChakraProps<"div", ArkToast.TitleProps> {}

export const ToastTitle = withContext<HTMLDivElement, ToastTitleProps>(
  ArkToast.Title,
  "title",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ToastDescriptionProps
  extends HTMLChakraProps<"div", ArkToast.DescriptionProps> {}

export const ToastDescription = withContext<
  HTMLDivElement,
  ToastDescriptionProps
>(ArkToast.Description, "description", { forwardAsChild: true })
