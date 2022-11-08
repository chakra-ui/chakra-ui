import { cx } from "@chakra-ui/shared-utils"
import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"

import { useTabsStyles } from "./tabs"
import { useTabIndicator } from "./use-tabs"

export interface TabIndicatorProps extends HTMLChakraProps<"div"> {}

/**
 * TabIndicator
 *
 * Used to render an active tab indicator that animates between
 * selected tabs.
 */
export const TabIndicator = forwardRef<TabIndicatorProps, "div">(
  function TabIndicator(props, ref) {
    const indicatorStyle = useTabIndicator()
    const style = {
      ...props.style,
      ...indicatorStyle,
    }

    const styles = useTabsStyles()

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-tabs__tab-indicator", props.className)}
        style={style}
        __css={styles.indicator}
      />
    )
  },
)

TabIndicator.displayName = "TabIndicator"
