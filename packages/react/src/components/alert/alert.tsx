"use client"

import { createSlotRecipeContext } from "@chakra-ui/styled-system/jsx"
import { alert } from "@chakra-ui/styled-system/recipes/alert"
import { type ComponentProps, Fragment, forwardRef } from "react"
import { createContext } from "../../create-context"
import {
  type ConditionalValue,
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
} from "../../styled-system"
import { CheckCircleIcon, InfoIcon, WarningIcon } from "../icons"

interface StatusProps {
  status: ConditionalValue<"info" | "warning" | "success" | "error" | "neutral">
}

export const [AlertStatusProvider, useAlertStatusContext] =
  createContext<StatusProps>({
    name: "AlertStatusContext",
    hookName: "useAlertStatusContext",
    providerName: "<Alert />",
  })

const { withProvider, withContext } = createSlotRecipeContext(alert)

export interface AlertRootBaseProps
  extends SlotRecipeProps<"alert">, UnstyledProp {}

export interface AlertRootProps extends HTMLChakraProps<
  "div",
  AlertRootBaseProps
> {}

const AlertRootBase = withProvider("div", "root")

export const AlertRoot = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof AlertRootBase>
>(function AlertRoot(props, ref) {
  const status = "status" in props ? props.status : undefined
  return (
    <AlertStatusProvider value={{ status: status ?? "info" }}>
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
