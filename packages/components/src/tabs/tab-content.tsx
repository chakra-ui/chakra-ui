import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useTabsStyles } from "./tabs-context"
import { useTabContent } from "./use-tab-content"

export interface TabContentProps extends HTMLChakraProps<"div"> {
  /**
   * The value of the tab panel. Must be equal to the value of the
   * corresponding tab.
   */
  value: string
}

export const TabContent = forwardRef<TabContentProps, "div">(
  function TabContent(props, ref) {
    const panelProps = useTabContent({ ...props, ref })
    const styles = useTabsStyles()

    return (
      <chakra.div
        {...panelProps}
        className={cx("chakra-tabs__content", props.className)}
        __css={styles.content}
      />
    )
  },
)

TabContent.displayName = "TabContent"
