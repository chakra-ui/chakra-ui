import { defineStyle } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"
import { cx } from "@chakra-ui/utils/cx"
import { useAlertContext, useAlertStyles } from "./alert-context"

export interface AlertDescriptionProps extends HTMLChakraProps<"div"> {}

export const AlertDescription = forwardRef<AlertDescriptionProps, "div">(
  function AlertDescription(props, ref) {
    const { status } = useAlertContext()

    const styles = useAlertStyles()

    const descriptionStyles = defineStyle({
      display: "inline",
      ...styles.description,
    })

    return (
      <chakra.div
        ref={ref}
        data-status={status}
        {...props}
        className={cx("chakra-alert__desc", props.className)}
        __css={descriptionStyles}
      />
    )
  },
)

AlertDescription.displayName = "AlertDescription"
