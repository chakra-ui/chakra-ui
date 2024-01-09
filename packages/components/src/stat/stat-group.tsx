import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"

export interface StatGroupProps extends HTMLChakraProps<"div"> {}

export const StatGroup = forwardRef<StatGroupProps, "div">(
  function StatGroup(props, ref) {
    return (
      <chakra.div
        {...props}
        ref={ref}
        role="group"
        className={cx("chakra-stat__group", props.className)}
        __css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      />
    )
  },
)

StatGroup.displayName = "StatGroup"
