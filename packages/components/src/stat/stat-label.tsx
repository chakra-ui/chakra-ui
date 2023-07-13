import { cx } from "@chakra-ui/shared-utils"
import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"
import { useStatStyles } from "./stat"

export interface StatLabelProps extends HTMLChakraProps<"dt"> {}

export const StatLabel = forwardRef<StatLabelProps, "dt">(function StatLabel(
  props,
  ref,
) {
  const styles = useStatStyles()
  return (
    <chakra.dt
      ref={ref}
      {...props}
      className={cx("chakra-stat__label", props.className)}
      __css={styles.label}
    />
  )
})

StatLabel.displayName = "StatLabel"
