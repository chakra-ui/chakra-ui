import { cx } from "@chakra-ui/shared-utils"
import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"

import { useTabsStyles } from "./tabs"
import { useTabPanels } from "./use-tabs"

export interface TabPanelsProps extends HTMLChakraProps<"div"> {}

/**
 * TabPanel
 *
 * Used to manage the rendering of multiple tab panels. It uses
 * `cloneElement` to hide/show tab panels.
 *
 * It renders a `div` by default.
 */
export const TabPanels = forwardRef<TabPanelsProps, "div">(function TabPanels(
  props,
  ref,
) {
  const panelsProps = useTabPanels(props)
  const styles = useTabsStyles()

  return (
    <chakra.div
      {...panelsProps}
      width="100%"
      ref={ref}
      className={cx("chakra-tabs__tab-panels", props.className)}
      __css={styles.tabpanels}
    />
  )
})

TabPanels.displayName = "TabPanels"
