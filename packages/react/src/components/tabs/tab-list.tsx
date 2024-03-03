import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  mergeProps,
  mergeRefs,
} from "../../styled-system"
import { useTabsStyles } from "./tabs-context"
import { useTabList } from "./use-tab-list"

export interface TabListProps extends HTMLChakraProps<"div"> {}

export const TabList = forwardRef<TabListProps, "div">(
  function TabList(props, ref) {
    const listProps = useTabList()
    const styles = useTabsStyles()

    const combinedProps = mergeProps<any>(listProps, props)

    return (
      <chakra.div
        ref={mergeRefs(listProps.ref, ref)}
        {...combinedProps}
        className={cx("chakra-tabs__list", props.className)}
        css={[styles.list, props.css]}
      />
    )
  },
)

TabList.displayName = "TabList"
