import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import {
  AlertProvider,
  AlertStatus,
  AlertStylesProvider,
  getStatusColorScheme,
} from "./alert-context"

interface AlertOptions {
  /**
   * The status of the alert
   * @default "info"
   */
  status?: AlertStatus
}

export interface AlertProps
  extends HTMLChakraProps<"div">,
    AlertOptions,
    ThemingProps<"Alert"> {
  /**
   * @default false
   */
  addRole?: boolean
}

/**
 * Alert is used to communicate the state or status of a
 * page, feature or action
 *
 * @see Docs https://chakra-ui.com/docs/components/alert
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const Alert = forwardRef<AlertProps, "div">(function Alert(props, ref) {
  const { status = "info", addRole = true, ...rest } = omitThemingProps(props)
  const colorScheme = props.colorScheme ?? getStatusColorScheme(status)

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
      <AlertStylesProvider value={styles}>
        <chakra.div
          role={addRole ? "alert" : undefined}
          ref={ref}
          {...rest}
          className={cx("chakra-alert", props.className)}
          __css={alertStyles}
        />
      </AlertStylesProvider>
    </AlertProvider>
  )
})

Alert.displayName = "Alert"
