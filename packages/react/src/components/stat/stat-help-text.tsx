import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
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
        css={styles.helpText}
      />
    )
  },
)

StatHelpText.displayName = "StatHelpText"
