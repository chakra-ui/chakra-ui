import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
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

export interface AlertRootProps
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
export const AlertRoot = forwardRef<AlertRootProps, "div">(
  function AlertRoot(props, ref) {
    const { status = "info", addRole = true, ...rest } = omitThemingProps(props)
    const colorScheme = props.colorScheme ?? getStatusColorScheme(status)

    const styles = useMultiStyleConfig("Alert", { ...props, colorScheme })

    return (
      <AlertProvider value={{ status }}>
        <AlertStylesProvider value={styles}>
          <chakra.div
            data-status={status}
            role={addRole ? "alert" : undefined}
            ref={ref}
            {...rest}
            className={cx("chakra-alert", props.className)}
            __css={styles.root}
          />
        </AlertStylesProvider>
      </AlertProvider>
    )
  },
)

AlertRoot.displayName = "Alert"
