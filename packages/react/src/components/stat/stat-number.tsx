import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useStatStyles } from "./stat-context"

export interface StatNumberProps extends HTMLChakraProps<"dd"> {}

export const StatNumber = forwardRef<HTMLElement, StatNumberProps>(
  function StatNumber(props, ref) {
    const styles = useStatStyles()
    return (
      <chakra.dd
        ref={ref}
        {...props}
        className={cx("chakra-stat__number", props.className)}
        css={[styles.number, props.css]}
      />
    )
  },
)

StatNumber.displayName = "StatNumber"
