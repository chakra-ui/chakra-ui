import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"

export interface CircularProgressLabelProps extends HTMLChakraProps<"div"> {}

/**
 * CircularProgress component label. In most cases it is a numeric indicator
 * of the circular progress component's value
 */
export const CircularProgressLabel = forwardRef<
  CircularProgressLabelProps,
  "div"
>(function CircularProgressLabel(props, ref) {
  return (
    <chakra.div
      ref={ref}
      {...props}
      className={cx("chakra-progress__label", props.className)}
    />
  )
})

CircularProgressLabel.displayName = "CircularProgressLabel"
