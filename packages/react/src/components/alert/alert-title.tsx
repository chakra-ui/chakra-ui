import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
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
        css={[styles.title, props.css]}
      />
    )
  },
)

AlertTitle.displayName = "AlertTitle"
