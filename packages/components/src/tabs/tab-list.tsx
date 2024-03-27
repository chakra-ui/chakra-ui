import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useTabsStyles } from "./tabs-context"
import { UseTabListProps, useTabList } from "./use-tab-list"

export interface TabListProps
  extends Omit<UseTabListProps, "ref">,
    Omit<HTMLChakraProps<"div">, "onKeyDown" | "ref"> {}

export const TabList = forwardRef<TabListProps, "div">(
  function TabList(props, ref) {
    const listProps = useTabList({ ...props, ref })
    const styles = useTabsStyles()

    return (
      <chakra.div
        {...listProps}
        className={cx("chakra-tabs__list", props.className)}
        __css={styles.list}
      />
    )
  },
)

TabList.displayName = "TabList"
