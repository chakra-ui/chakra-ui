import { CheckIcon, InfoIcon, WarningIcon } from "./icons"
import {
  chakra,
  PropsOf,
  StylesProvider,
  useStyles,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { createContext, cx } from "@chakra-ui/utils"
import React, { forwardRef, Ref, ReactNode } from "react"
import { DivProps } from "./localTypes"

export const STATUSES = {
  info: { icon: InfoIcon, colorScheme: "blue" },
  warning: { icon: WarningIcon, colorScheme: "orange" },
  success: { icon: CheckIcon, colorScheme: "green" },
  error: { icon: WarningIcon, colorScheme: "red" },
}

type AlertContext = { status: keyof typeof STATUSES }

const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: "AlertContext",
  errorMessage:
    "useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<Alert />`",
})

interface AlertOptions {
  /**
   * The status of the alert
   */
  status?: keyof typeof STATUSES
}

export type AlertProps = Omit<DivProps, "children"> &
  AlertOptions &
  ThemingProps & { children: ReactNode }

/**
 * Alert
 *
 * React component used to communicate the state or status of a
 * page, feature or action
 */
export const Alert = forwardRef(function Alert(
  props: AlertProps,
  ref: Ref<HTMLDivElement>,
) {
  const { status = "info", ...rest } = props
  const { colorScheme } = STATUSES[status]

  const styles = useMultiStyleConfig("Alert", { ...props, colorScheme })
  const alertStyles = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    ...styles.container,
  }

  return (
    <AlertProvider value={{ status }}>
      <StylesProvider value={styles}>
        <chakra.div
          role="alert"
          ref={ref}
          {...rest}
          className={cx("chakra-alert", props.className)}
          __css={alertStyles}
        />
      </StylesProvider>
    </AlertProvider>
  )
})

export type AlertTitleProps = Omit<DivProps, "children"> & {
  children: ReactNode
}

export const AlertTitle = forwardRef(function AlertTitle(
  props: AlertTitleProps,
  ref: Ref<HTMLDivElement>,
) {
  const styles = useStyles()
  return (
    <chakra.div
      ref={ref}
      {...props}
      className={cx("chakra-alert__title", props.className)}
      __css={styles.title}
    />
  )
})

export type AlertDescriptionProps = Omit<DivProps, "children"> & {
  children: ReactNode
}

export const AlertDescription = forwardRef(function AlertDescription(
  props: AlertDescriptionProps,
  ref: Ref<HTMLDivElement>,
) {
  const styles = useStyles()
  const descriptionStyles = {
    display: "inline-block",
    ...styles.description,
  }

  return (
    <chakra.div
      ref={ref}
      {...props}
      className={cx("chakra-alert__desc", props.className)}
      __css={descriptionStyles}
    />
  )
})

export type AlertIconProps = Omit<PropsOf<typeof chakra.span>, "children">

export const AlertIcon = (props: AlertIconProps) => {
  const { status } = useAlertContext()
  const { icon: BaseIcon } = STATUSES[status]
  const styles = useStyles()

  return (
    <chakra.span
      display="inherit"
      {...props}
      className={cx("chakra-alert__icon", props.className)}
      __css={styles.icon}
    >
      <BaseIcon w="100%" h="100%" />
    </chakra.span>
  )
}
