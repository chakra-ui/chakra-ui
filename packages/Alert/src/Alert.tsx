import { IconProps } from "@chakra-ui/icon"
import {
  ColorModeType,
  createChakra,
  forwardRef,
  PropsOf,
  useColorMode,
} from "@chakra-ui/system"
import * as React from "react"
import {
  InfoIcon,
  WarningTwoIcon,
  CheckCircleIcon,
  WarningIcon,
} from "@chakra-ui/icon-glyphs"
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

const StyledAlert = createChakra("div", {
  themeKey: "Alert.Root",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
})

const Alert = forwardRef((props: AlertProps, ref: React.Ref<any>) => {
  const { status = "info", variant = "subtle", ...rest } = props
  const variantColor = statuses[status]["color"]

  const context = { status, variant }
  return (
    <AlertContextProvider value={context}>
      <StyledAlert
        ref={ref}
        role="alert"
        variant={variant}
        {...rest}
        variantColor={variantColor}
      />
    </AlertContextProvider>
  )
})

const AlertTitle = createChakra("div", {
  themeKey: "Alert.Title",
  baseStyle: {
    fontWeight: "bold",
    lineHeight: "normal",
  },
})

const AlertDescription = createChakra("div", { themeKey: "Alert.Description" })

const AlertIcon = (props: IconProps) => {
  const [colorMode] = useColorMode()
  const { status, variant } = useAlertContext()
  const { icon: Icon, color } = statuses[status]

  let style: { [K in ColorModeType]?: any } = {}

  if (["left-accent", "top-accent", "subtle"].includes(variant)) {
    style = {
      light: { color: `${color}.500` },
      dark: { color: `${color}.200` },
    }
  }

  const styles = style[colorMode]

  return <Icon mt={1} mr={3} size={5} {...styles} {...props} />
}

export { Alert, AlertTitle, AlertDescription, AlertIcon }
