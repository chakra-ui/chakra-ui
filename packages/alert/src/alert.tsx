import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons"
import { chakra, PropsOf, useThemeDefaultProps } from "@chakra-ui/system"
import { createContext, cx } from "@chakra-ui/utils"
import * as React from "react"

export const ALERT_STATUSES = {
  info: { icon: InfoIcon, color: "blue" },
  warning: { icon: WarningTwoIcon, color: "orange" },
  success: { icon: CheckCircleIcon, color: "green" },
  error: { icon: WarningIcon, color: "red" },
}

type AlertContext = Required<AlertOptions>

const [AlertContextProvider, useAlertContext] = createContext<AlertContext>({
  name: "AlertContext",
})

interface AlertOptions {
  /**
   * The status of the alert
   */
  status?: keyof typeof ALERT_STATUSES
  /**
   * The variant of the alert style to use.
   */
  variant?: string
}

export type AlertProps = PropsOf<typeof StyledAlert> & AlertOptions

const StyledAlert = chakra("div", {
  themeKey: "Alert.Root",
  baseStyle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  attrs: {
    role: "alert",
  },
})

/**
 * Alert
 *
 * React component used to communicate the state or status of a
 * page, feature or action
 */
export const Alert = React.forwardRef(
  (props: AlertProps, ref: React.Ref<any>) => {
    const defaults = useThemeDefaultProps("Alert")

    const {
      status = "info",
      variant = defaults?.variant,
      className,
      ...rest
    } = props
    const colorScheme = ALERT_STATUSES[status]["color"]

    const context = { status, variant }

    const _className = cx("chakra-alert", className)

    return (
      <AlertContextProvider value={context as AlertContext}>
        <StyledAlert
          ref={ref}
          variant={variant}
          colorScheme={colorScheme}
          className={_className}
          {...rest}
        />
      </AlertContextProvider>
    )
  },
)

export type AlertTitleProps = PropsOf<typeof AlertTitle>

export const AlertTitle = chakra("div", {
  themeKey: "Alert.Title",
  baseStyle: {
    fontWeight: "bold",
    lineHeight: "normal",
  },
  attrs: (props) => ({
    className: cx("chakra-alert__title", props.className),
  }),
})

/**
 * AlertDescription
 *
 * The description of the alert to be announced by screen
 * readers.
 */
export const AlertDescription = chakra("div", {
  themeKey: "Alert.Description",
  baseStyle: {
    display: "inline-block",
  },
  attrs: (props) => ({
    className: cx("chakra-alert__description", props.className),
  }),
})

const StyledWrapper = chakra("span", { themeKey: "Alert.Icon" })

export type AlertIconProps = PropsOf<typeof StyledWrapper>

/**
 * AlertIcon
 *
 * The visual icon for the alert that changes based on the `status` prop.
 */
export const AlertIcon = (props: AlertIconProps) => {
  const { status, variant } = useAlertContext()
  const { icon: Icon, color: colorScheme } = ALERT_STATUSES[status]

  const _className = cx("chakra-alert__icon")

  return (
    <StyledWrapper
      display="inherit"
      variant={variant}
      colorScheme={colorScheme}
      {...props}
      className={_className}
    >
      <Icon boxSize="100%" />
    </StyledWrapper>
  )
}
