import { defineStyle } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { useTabsStyles } from "./tabs-context"
import { UseTabOptions, useTab } from "./use-tab"

export interface TabTriggerProps
  extends UseTabOptions,
    Omit<HTMLChakraProps<"button">, "value"> {}

/**
 * Tab button used to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const TabTrigger = forwardRef<TabTriggerProps, "button">(
  function Tab(props, ref) {
    const styles = useTabsStyles()
    const tabProps = useTab({ ...props, ref })

    const tabStyles = defineStyle({
      outline: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...styles.trigger,
    })

    return (
      <chakra.button
        {...tabProps}
        className={cx("chakra-tabs__tab", props.className)}
        __css={tabStyles}
      />
    )
  },
)

TabTrigger.displayName = "TabTrigger"
