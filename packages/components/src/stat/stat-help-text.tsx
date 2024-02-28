import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useStatStyles } from "./stat-context"

export interface StatHelpTextProps extends HTMLChakraProps<"dd"> {}

export const StatHelpText = forwardRef<StatHelpTextProps, "dd">(
  function StatHelpText(props, ref) {
    const styles = useStatStyles()

    return (
      <chakra.dd
        ref={ref}
        {...props}
        className={cx("chakra-stat__help-text", props.className)}
        __css={styles.helpText}
      />
    )
  },
)

StatHelpText.displayName = "StatHelpText"
