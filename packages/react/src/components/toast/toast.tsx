"use client"

import type { Assign } from "@ark-ui/react"
import {
  Toast as ArkToast,
  Toaster as ArkToaster,
  type CreateToasterProps,
  type CreateToasterReturn,
  type ToasterBaseProps,
  createToaster,
  useToastContext,
} from "@ark-ui/react/toast"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { CheckCircleIcon, CloseIcon, WarningIcon } from "../icons"

export { createToaster, type CreateToasterProps, type CreateToasterReturn }

const {
  withProvider,
  withContext,
  useStyles: useToastStyles,
} = createSlotRecipeContext({ key: "toast" })

export { useToastStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ToasterProps
  extends HTMLChakraProps<"div", ToasterBaseProps> {}

export const Toaster = chakra(
  ArkToaster,
  {},
  { forwardAsChild: true },
) as React.FC<ToasterProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ToastRootBaseProps
  extends Assign<ArkToast.RootBaseProps, SlotRecipeProps<"toast">>,
    UnstyledProp {}

export interface ToastRootProps
  extends HTMLChakraProps<"div", ToastRootBaseProps> {}

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
>(ArkToast.CloseTrigger, "closeTrigger", {
  forwardAsChild: true,
  defaultProps: {
    children: <CloseIcon />,
  },
})

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

////////////////////////////////////////////////////////////////////////////////////

export interface ToastActionTriggerProps
  extends HTMLChakraProps<"button", ArkToast.ActionTriggerProps> {}

export const ToastActionTrigger = withContext<
  HTMLButtonElement,
  ToastActionTriggerProps
>(ArkToast.ActionTrigger, "actionTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

const iconMap: Record<string, React.ElementType> = {
  warning: WarningIcon,
  success: CheckCircleIcon,
  error: WarningIcon,
}

export interface ToastIndicatorProps extends HTMLChakraProps<"span"> {}

export const ToastIndicator = forwardRef<HTMLSpanElement, ToastIndicatorProps>(
  function ToastIndicator(props, ref) {
    const api = useToastContext()
    const styles = useToastStyles()

    const Component = iconMap[api.type]
    if (!Component) return null

    return (
      <Component ref={ref} {...props} css={[styles.indicator, props.css]} />
    )
  },
)
