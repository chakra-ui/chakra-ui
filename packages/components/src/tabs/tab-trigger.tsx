import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useTabsStyles } from "./tabs-context"
import { UseTabOptions, useTab } from "./use-tab"

export interface TabTriggerProps
  extends UseTabOptions,
    HTMLChakraProps<"button"> {}

export const TabTrigger = forwardRef<TabTriggerProps, "button">(
  function TabTrigger(props, ref) {
    const styles = useTabsStyles()
    const tabProps = useTab({ ...props, ref })

    return (
      <chakra.button
        {...tabProps}
        className={cx("chakra-tabs__tab", props.className)}
        __css={styles.trigger}
      />
    )
  },
)

TabTrigger.displayName = "TabTrigger"
