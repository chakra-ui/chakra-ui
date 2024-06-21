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
import { createIcon } from "../icon"

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

const CheckIcon = createIcon({
  d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z",
})

const InfoIcon = createIcon({
  d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z",
})

const WarningIcon = createIcon({
  d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z",
})

const iconMap = {
  info: InfoIcon,
  warning: WarningIcon,
  success: CheckIcon,
  error: WarningIcon,
}

export interface AlertIconProps extends HTMLChakraProps<"span"> {}

export const AlertIcon = forwardRef<SVGSVGElement, AlertIconProps>(
  function AlertIcon(props, ref) {
    const api = useAlertStatusContext()
    const styles = useAlertStyles()

    const Icon = iconMap[api.status]
    return (
      <chakra.span ref={ref} {...props} css={[styles["icon"], props.css]}>
        {props.children || <Icon />}
      </chakra.span>
    )
  },
)
