"use client"

import { createSlotRecipeContext } from "@chakra-ui/styled-system/jsx"
import { alert } from "@chakra-ui/styled-system/recipes/alert"
import { type ComponentProps, Fragment, forwardRef } from "react"
import { createContext } from "../../create-context"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
} from "../../styled-system"
import { CheckCircleIcon, InfoIcon, WarningIcon } from "../icons"

const { withProvider, withContext } = createSlotRecipeContext(alert)

const AlertRootBase = withProvider("div", "root")

interface StatusProps {
  status: ComponentProps<typeof AlertRootBase>["status"]
}

export const [AlertStatusProvider, useAlertStatusContext] =
  createContext<StatusProps>({
    name: "AlertStatusContext",
    hookName: "useAlertStatusContext",
    providerName: "<Alert />",
  })

export interface AlertRootBaseProps
  extends SlotRecipeProps<"alert">, UnstyledProp {}

export interface AlertRootProps extends HTMLChakraProps<
  "div",
  AlertRootBaseProps
> {}

export const AlertRoot = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof AlertRootBase>
>(function AlertRoot(props, ref) {
  return (
    <AlertStatusProvider value={{ status: props.status ?? "info" }}>
      <AlertRootBase ref={ref} {...props} />
    </AlertStatusProvider>
  )
})

export interface AlertTitleProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const AlertTitle = withContext("div", "title")

export interface AlertDescriptionProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const AlertDescription = withContext("div", "description")

export interface AlertContentProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const AlertContent = withContext("div", "content")

const iconMap = {
  info: InfoIcon,
  warning: WarningIcon,
  success: CheckCircleIcon,
  error: WarningIcon,
  neutral: InfoIcon,
}

export interface AlertIndicatorProps extends HTMLChakraProps<"span"> {}

const AlertIndicatorBase = withContext("span", "indicator")

export const AlertIndicator = forwardRef<
  HTMLSpanElement,
  ComponentProps<typeof AlertIndicatorBase>
>(function AlertIndicator(props, ref) {
  const api = useAlertStatusContext()
  const Icon = typeof api.status === "string" ? iconMap[api.status] : Fragment
  const { children = <Icon />, ...rest } = props
  return (
    <AlertIndicatorBase ref={ref} {...rest}>
      {children}
    </AlertIndicatorBase>
  )
})
