import { CheckIcon, InfoIcon, WarningIcon } from "./alert-icons"
import {
  chakra,
  PropsOf,
  StylesProvider,
  useStyles,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/system"
import { createContext, cx } from "@chakra-ui/utils"
import * as React from "react"

export const STATUSES = {
  info: { icon: InfoIcon, colorScheme: "blue" },
  warning: { icon: WarningIcon, colorScheme: "orange" },
  success: { icon: CheckIcon, colorScheme: "green" },
  error: { icon: WarningIcon, colorScheme: "red" },
}

type AlertContext = { status: keyof typeof STATUSES }

const [AlertContextProvider, useAlertContext] = createContext<AlertContext>({
  name: "AlertContext",
})

interface AlertOptions {
  /**
   * The status of the alert
   */
  status?: keyof typeof STATUSES
}

export type AlertProps = PropsOf<typeof StyledAlert> &
  AlertOptions &
  ThemingProps

const StyledAlert = chakra("div", {
  baseStyle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
})

/**
 * Alert
 *
 * React component used to communicate the state or status of a
 * page, feature or action
 */
export const Alert = React.forwardRef(function Alert(
  props: AlertProps,
  ref: React.Ref<any>,
) {
  const { status = "info", className, ...rest } = props
  const { colorScheme } = STATUSES[status]

  const styles = useStyleConfig("Alert", { ...props, colorScheme })
  const _className = cx("chakra-alert", className)

  return (
    <AlertContextProvider value={{ status }}>
      <StylesProvider value={styles}>
        <StyledAlert
          role="alert"
          ref={ref}
          className={_className}
          {...rest}
          __css={styles.Root}
        />
      </StylesProvider>
    </AlertContextProvider>
  )
})

export type AlertTitleProps = PropsOf<typeof chakra.div>

export const AlertTitle = React.forwardRef(function AlertTitle(
  props: AlertTitleProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const _className = cx("chakra-alert__title", className)
  const styles = useStyles()

  return (
    <chakra.div
      ref={ref}
      className={_className}
      {...rest}
      __css={styles.Title}
    />
  )
})

export type AlertDescriptionProps = PropsOf<typeof chakra.div>

export const AlertDescription = React.forwardRef(function AlertDescription(
  props: AlertDescriptionProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const _className = cx("chakra-alert__description", className)
  const styles = useStyles()

  return (
    <chakra.div
      display="inline-block"
      ref={ref}
      className={_className}
      {...rest}
      __css={styles.Description}
    />
  )
})

export type AlertIconProps = PropsOf<typeof chakra.span>

/**
 * AlertIcon
 *
 * The visual icon for the alert that changes based on the `status` prop.
 */
export const AlertIcon = (props: AlertIconProps) => {
  const { status } = useAlertContext()
  const { icon: Comp } = STATUSES[status]

  const _className = cx("chakra-alert__icon", props.className)
  const styles = useStyles()

  return (
    <chakra.span
      display="inherit"
      {...props}
      className={_className}
      __css={styles.Icon}
    >
      <Comp w="100%" h="100%" />
    </chakra.span>
  )
}
