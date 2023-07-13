import { cx } from "@chakra-ui/shared-utils"
import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"
import { useStatStyles } from "./stat"

export interface StatNumberProps extends HTMLChakraProps<"dd"> {}

export const StatNumber = forwardRef<StatNumberProps, "dd">(function StatNumber(
  props,
  ref,
) {
  const styles = useStatStyles()
  return (
    <chakra.dd
      ref={ref}
      {...props}
      className={cx("chakra-stat__number", props.className)}
      __css={{
        ...styles.number,
        fontFeatureSettings: "pnum",
        fontVariantNumeric: "proportional-nums",
      }}
    />
  )
})

StatNumber.displayName = "StatNumber"
