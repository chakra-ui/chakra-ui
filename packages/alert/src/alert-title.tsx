import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useAlertStyles } from "./alert-context"

export interface AlertTitleProps extends HTMLChakraProps<"div"> {}

export const AlertTitle = forwardRef<AlertTitleProps, "div">(
  function AlertTitle(props, ref) {
    const styles = useAlertStyles()

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

AlertTitle.displayName = "AlertTitle"
