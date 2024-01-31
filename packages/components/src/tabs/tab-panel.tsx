import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { useTabsStyles } from "./tabs"
import { useTabPanel } from "./use-tabs"

export interface TabPanelProps extends HTMLChakraProps<"div"> {
  /**
   * The value of the tab panel. Must be equal to the value of the
   * corresponding tab.
   */
  value: string
}

/**
 * TabPanel
 * Used to render the content for a specific tab.
 */
export const TabPanel = forwardRef<TabPanelProps, "div">(
  function TabPanel(props, ref) {
    const panelProps = useTabPanel({ ...props, ref })
    const styles = useTabsStyles()

    return (
      <chakra.div
        outline="0"
        {...panelProps}
        className={cx("chakra-tabs__tab-panel", props.className)}
        __css={styles.tabpanel}
      />
    )
  },
)

TabPanel.displayName = "TabPanel"
