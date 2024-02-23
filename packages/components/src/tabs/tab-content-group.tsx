import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useTabsStyles } from "./tabs-context"
import { useTabContentGroup } from "./use-tab-content-group"

export interface TabContentGroupProps extends HTMLChakraProps<"div"> {}

export const TabContentGroup = forwardRef<TabContentGroupProps, "div">(
  function TabContentGroup(props, ref) {
    const groupProps = useTabContentGroup(props)
    const styles = useTabsStyles()

    return (
      <chakra.div
        {...groupProps}
        ref={ref}
        className={cx("chakra-tabs__content-group", props.className)}
        __css={styles.contentGroup}
      />
    )
  },
)

TabContentGroup.displayName = "TabPanels"
