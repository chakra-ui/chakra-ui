import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { mergeProps } from "../../styled-system/merge-props"
import { splitTabProps } from "./tab-props"
import { useTabsStyles } from "./tabs-context"
import { UseTabProps, useTab } from "./use-tab"

export interface TabTriggerProps
  extends HTMLChakraProps<"button", UseTabProps> {}

/**
 * Tab button used to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const TabTrigger = forwardRef<TabTriggerProps, "button">(
  function Tab(props, ref) {
    const styles = useTabsStyles()

    const [useTabProps, localProps] = splitTabProps(props)
    const tabProps = useTab(useTabProps)

    const combinedProps = mergeProps<any>(tabProps, localProps)

    return (
      <chakra.button
        ref={ref}
        {...combinedProps}
        className={cx("chakra-tabs__tab", props.className)}
        css={[styles.trigger, props.css]}
      />
    )
  },
)

TabTrigger.displayName = "TabTrigger"
