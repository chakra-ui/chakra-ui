"use client"

import { forwardRef } from "react"
import { createContext } from "../../create-context"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createStyleContext,
} from "../../styled-system"
import { CheckCircleIcon, InfoIcon, WarningIcon } from "../icons"

interface StatusProps {
  status: "info" | "warning" | "success" | "error"
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
} = createStyleContext("alert")

export { useAlertStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface AlertRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"alert">,
    UnstyledProp {}

export const AlertRoot = withProvider<HTMLDivElement, AlertRootProps>(
  "div",
  "root",
  {
    forwardAsChild: true,
    wrapElement(element, props) {
      return (
        <AlertStatusProvider value={{ status: props.status || "info" }}>
          {element}
        </AlertStatusProvider>
      )
    },
  },
)

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

const iconMap = {
  info: InfoIcon,
  warning: WarningIcon,
  success: CheckCircleIcon,
  error: WarningIcon,
}

export interface AlertIndicatorProps extends HTMLChakraProps<"span"> {}

export const AlertIndicator = forwardRef<SVGSVGElement, AlertIndicatorProps>(
  function AlertIndicator(props, ref) {
    const api = useAlertStatusContext()
    const styles = useAlertStyles()
    const Icon = iconMap[api.status]
    const { children = <Icon />, ...rest } = props
    return (
      <chakra.span ref={ref} {...rest} css={[styles.indicator, props.css]}>
        {children}
      </chakra.span>
    )
  },
)
