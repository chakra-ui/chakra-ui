import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useStatStyles } from "./stat-context"

export interface StatNumberProps extends HTMLChakraProps<"dd"> {}

export const StatNumber = forwardRef<StatNumberProps, "dd">(
  function StatNumber(props, ref) {
    const styles = useStatStyles()
    return (
      <chakra.dd
        ref={ref}
        {...props}
        className={cx("chakra-stat__number", props.className)}
        css={{
          ...styles.number,
          fontFeatureSettings: "pnum",
          fontVariantNumeric: "proportional-nums",
        }}
      />
    )
  },
)

StatNumber.displayName = "StatNumber"
