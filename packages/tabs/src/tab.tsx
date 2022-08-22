import { cx } from "@chakra-ui/shared-utils"
import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "@chakra-ui/system"

import { useTabsStyles } from "./tabs"
import { UseTabOptions, useTab } from "./use-tabs"

export interface TabProps extends UseTabOptions, HTMLChakraProps<"button"> {}

/**
 * Tab button used to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const Tab = forwardRef<TabProps, "button">(function Tab(props, ref) {
  const styles = useTabsStyles()
  const tabProps = useTab({ ...props, ref })

  const tabStyles: SystemStyleObject = {
    outline: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...styles.tab,
  }

  return (
    <chakra.button
      {...tabProps}
      className={cx("chakra-tabs__tab", props.className)}
      __css={tabStyles}
    />
  )
})

Tab.displayName = "Tab"
