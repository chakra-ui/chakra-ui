import {
  chakra,
  forwardRef,
  SystemStyleObject,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useAlertStyles } from "./alert-context"

export interface AlertDescriptionProps extends HTMLChakraProps<"div"> {}

export const AlertDescription = forwardRef<AlertDescriptionProps, "div">(
  function AlertDescription(props, ref) {
    const styles = useAlertStyles()
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

AlertDescription.displayName = "AlertDescription"
