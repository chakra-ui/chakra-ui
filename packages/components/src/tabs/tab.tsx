import { defineStyle } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { useTabsStyles } from "./tabs"
import { UseTabOptions, useTab } from "./use-tabs"

export interface TabProps
  extends UseTabOptions,
    Omit<HTMLChakraProps<"button">, "value"> {}

/**
 * Tab button used to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const Tab = forwardRef<TabProps, "button">(function Tab(props, ref) {
  const styles = useTabsStyles()
  const tabProps = useTab({ ...props, ref })

  const tabStyles = defineStyle({
    outline: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...styles.tab,
  })

  return (
    <chakra.button
      {...tabProps}
      className={cx("chakra-tabs__tab", props.className)}
      __css={tabStyles}
    />
  )
})

Tab.displayName = "Tab"
