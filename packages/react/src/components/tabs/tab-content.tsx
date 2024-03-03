import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useRenderStrategy } from "../render-strategy"
import { useTabsContext, useTabsStyles } from "./tabs-context"
import { makeTabId, makeTabPanelId } from "./use-tabs"

export interface TabContentProps extends HTMLChakraProps<"div"> {
  /**
   * The value of the tab panel. Must be equal to the value of the
   * corresponding tab.
   */
  value: string
}

export const TabContent = forwardRef<TabContentProps, "div">(
  function TabContent(props, ref) {
    const api = useTabsContext()
    const styles = useTabsStyles()

    const isSelected = props.value === api.selectedValue

    const contentId = makeTabPanelId(api.id, props.value)
    const triggerId = makeTabId(api.id, props.value)

    const render = useRenderStrategy({
      isLazy: api.isLazy,
      lazyBehavior: api.lazyBehavior,
      visible: isSelected,
    })

    return (
      <chakra.div
        {...props}
        ref={ref}
        id={contentId}
        tabIndex={0}
        role="tabpanel"
        aria-labelledby={triggerId}
        hidden={render.hidden}
        className={cx("chakra-tabs__content", props.className)}
        css={[styles.content, props.css]}
      >
        {render.unmounted ? null : props.children}
      </chakra.div>
    )
  },
)

TabContent.displayName = "TabContent"
