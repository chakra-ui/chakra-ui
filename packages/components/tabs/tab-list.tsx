import { cx } from "@chakra-ui/shared-utils"
import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "@chakra-ui/system"

import { useTabsStyles } from "./tabs"
import { UseTabListProps, useTabList } from "./use-tabs"

export interface TabListProps
  extends UseTabListProps,
    Omit<HTMLChakraProps<"div">, "onKeyDown" | "ref"> {}

/**
 * TabList is used to manage a list of tab buttons. It renders a `div` by default,
 * and is responsible the keyboard interaction between tabs.
 */
export const TabList = forwardRef<TabListProps, "div">(function TabList(
  props,
  ref,
) {
  const tablistProps = useTabList({ ...props, ref })

  const styles = useTabsStyles()

  const tablistStyles: SystemStyleObject = {
    display: "flex",
    ...styles.tablist,
  }

  return (
    <chakra.div
      {...tablistProps}
      className={cx("chakra-tabs__tablist", props.className)}
      __css={tablistStyles}
    />
  )
})

TabList.displayName = "TabList"
