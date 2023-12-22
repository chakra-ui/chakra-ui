import { cx } from "@chakra-ui/utils/cx"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useAlertContext, useAlertStyles } from "./alert-context"

export interface AlertTitleProps extends HTMLChakraProps<"div"> {}

export const AlertTitle = forwardRef<AlertTitleProps, "div">(
  function AlertTitle(props, ref) {
    const styles = useAlertStyles()
    const { status } = useAlertContext()

    return (
      <chakra.div
        ref={ref}
        data-status={status}
        {...props}
        className={cx("chakra-alert__title", props.className)}
        __css={styles.title}
      />
    )
  },
)

AlertTitle.displayName = "AlertTitle"
