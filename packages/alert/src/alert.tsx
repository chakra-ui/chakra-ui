import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  WithChakraProps,
} from "@chakra-ui/system"
import { createContext, cx } from "@chakra-ui/utils"
import * as React from "react"
import { CheckIcon, InfoIcon, WarningIcon } from "./icons"

const STATUSES = {
  info: { icon: InfoIcon, colorScheme: "blue" },
  warning: { icon: WarningIcon, colorScheme: "orange" },
  success: { icon: CheckIcon, colorScheme: "green" },
  error: { icon: WarningIcon, colorScheme: "red" },
}

export type AlertStatus = keyof typeof STATUSES

interface AlertContext {
  status: AlertStatus
}

const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: "AlertContext",
  errorMessage:
    "useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<Alert />`",
})

interface AlertOptions {
  /**
   * The status of the alert
   */
  status?: AlertStatus
}

export interface AlertProps
  extends WithChakraProps<"div">,
    AlertOptions,
    ThemingProps {}

/**
 * Alert is used to communicate the state or status of a
 * page, feature or action
 */
export const Alert = forwardRef<AlertProps, "div">(function Alert(props, ref) {
  const { status = "info", ...rest } = omitThemingProps(props)
  const { colorScheme } = STATUSES[status]

  const styles = useMultiStyleConfig("Alert", { ...props, colorScheme })

  const alertStyles: SystemStyleObject = {
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

export interface AlertTitleProps extends WithChakraProps<"div"> {}

export const AlertTitle = forwardRef<AlertTitleProps, "div">(
  function AlertTitle(props, ref) {
    const styles = useStyles()

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-alert__title", props.className)}
        __css={styles.title}
      />
    )
  },
)

export interface AlertDescriptionProps extends WithChakraProps<"div"> {}

export const AlertDescription = forwardRef<AlertDescriptionProps, "div">(
  function AlertDescription(props, ref) {
    const styles = useStyles()
    const descriptionStyles: SystemStyleObject = {
      display: "inline",
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
  },
)

export interface AlertIconProps extends WithChakraProps<"span"> {}

export const AlertIcon: React.FC<AlertIconProps> = (props) => {
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
