"use client"

import { Fragment, forwardRef } from "react"
import { createContext } from "../../create-context"
import {
  type ConditionalValue,
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
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

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useAlertStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "alert" })

export { useAlertStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface AlertRootBaseProps
  extends SlotRecipeProps<"alert">,
    UnstyledProp {}

export interface AlertRootProps
  extends HTMLChakraProps<"div", AlertRootBaseProps> {}

export const AlertRoot = withProvider<HTMLDivElement, AlertRootProps>(
  "div",
  "root",
  {
    forwardAsChild: true,
    wrapElement(element, props) {
      return (
        // @ts-ignore fix later
        <AlertStatusProvider value={{ status: props.status || "info" }}>
          {element}
        </AlertStatusProvider>
      )
    },
  },
)

////////////////////////////////////////////////////////////////////////////////////

export const AlertPropsProvider =
  PropsProvider as React.Provider<AlertRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface AlertTitleProps extends HTMLChakraProps<"div"> {}

export const AlertTitle = withContext<HTMLDivElement, AlertTitleProps>(
  "div",
  "title",
)

////////////////////////////////////////////////////////////////////////////////////

export interface AlertDescriptionProps extends HTMLChakraProps<"div"> {}

export const AlertDescription = withContext<
  HTMLDivElement,
  AlertDescriptionProps
>("div", "description")

////////////////////////////////////////////////////////////////////////////////////

export interface AlertContentProps extends HTMLChakraProps<"div"> {}

export const AlertContent = withContext<HTMLDivElement, AlertContentProps>(
  "div",
  "content",
)

////////////////////////////////////////////////////////////////////////////////////

const iconMap = {
  info: InfoIcon,
  warning: WarningIcon,
  success: CheckCircleIcon,
  error: WarningIcon,
  neutral: InfoIcon,
}

export interface AlertIndicatorProps extends HTMLChakraProps<"span"> {}

export const AlertIndicator = forwardRef<SVGSVGElement, AlertIndicatorProps>(
  function AlertIndicator(props, ref) {
    const api = useAlertStatusContext()
    const styles = useAlertStyles()

    const Icon = typeof api.status === "string" ? iconMap[api.status] : Fragment
    const { children = <Icon />, ...rest } = props

    return (
      <chakra.span ref={ref} {...rest} css={[styles.indicator, props.css]}>
        {children}
      </chakra.span>
    )
  },
)
