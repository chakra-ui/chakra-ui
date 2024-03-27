import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useStatStyles } from "./stat-context"

export interface StatLabelProps extends HTMLChakraProps<"dt"> {}

export const StatLabel = forwardRef<StatLabelProps, "dt">(
  function StatLabel(props, ref) {
    const styles = useStatStyles()
    return (
      <chakra.dt
        ref={ref}
        {...props}
        className={cx("chakra-stat__label", props.className)}
        __css={styles.label}
      />
    )
  },
)

StatLabel.displayName = "StatLabel"
