import { IconProps } from "@chakra-ui/icon"
import {
  ColorMode,
  chakra,
  PropsOf,
  useColorMode,
  useComponentDefaults,
} from "@chakra-ui/system"
import React, { forwardRef } from "react"
import {
  InfoIcon,
  WarningTwoIcon,
  CheckCircleIcon,
  WarningIcon,
} from "@chakra-ui/icons"
import { createContext } from "@chakra-ui/utils"

export const statuses = {
  info: { icon: InfoIcon, color: "blue" },
  warning: { icon: WarningTwoIcon, color: "orange" },
  success: { icon: CheckCircleIcon, color: "green" },
  error: { icon: WarningIcon, color: "red" },
}

type AlertContext = Required<AlertOptions>

const [AlertContextProvider, useAlertContext] = createContext<AlertContext>()

export interface AlertOptions {
  /**
   * The status of the alert
   */
  status?: keyof typeof statuses
  /**
   * The variant of the alert style to use.
   */
  variant?: "subtle" | "solid" | "left-accent" | "top-accent"
}

export type AlertProps = PropsOf<typeof StyledAlert> & AlertOptions

const StyledAlert = chakra("div", {
  themeKey: "Alert.Root",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  attrs: {
    role: "alert",
  },
})

export const Alert = forwardRef((props: AlertProps, ref: React.Ref<any>) => {
  const defaults = useComponentDefaults("Alert")

  const {
    status = "info",
    variant = defaults?.variant || "subtle",
    ...rest
  } = props

  const colorScheme = statuses[status]["color"]

  const context = { status, variant }

  return (
    <AlertContextProvider value={context as AlertContext}>
      <StyledAlert
        ref={ref}
        variant={variant}
        {...rest}
        colorScheme={colorScheme}
      />
    </AlertContextProvider>
  )
})

export const AlertTitle = chakra("div", {
  themeKey: "Alert.Title",
  baseStyle: {
    fontWeight: "bold",
    lineHeight: "normal",
  },
})

export const AlertDescription = chakra("div", { themeKey: "Alert.Description" })

export const AlertIcon = (props: IconProps) => {
  const [colorMode] = useColorMode()
  const { status, variant } = useAlertContext()
  const { icon: Icon, color } = statuses[status]

  let style: { [K in ColorMode]?: any } = {}

  if (["left-accent", "top-accent", "subtle"].includes(variant)) {
    style = {
      light: { color: `${color}.500` },
      dark: { color: `${color}.200` },
    }
  }

  const styles = style[colorMode]

  return <Icon mt={1} mr={3} size={5} {...styles} {...props} />
}
