import { getValidChildren } from "@chakra-ui/utils/children"
import { createElement } from "react"
import { TabContentProvider, useTabsContext } from "./tabs-context"
import { makeTabId, makeTabPanelId } from "./use-tabs"

export interface UseTabPanelsProps {
  children?: React.ReactNode
}

/**
 * Tabs hook for managing the visibility of multiple tab panels.
 *
 * Since only one panel can be show at a time, we use `cloneElement`
 * to inject `selected` panel to each TabPanel.
 *
 * It returns a cloned version of its children with
 * all functionality included.
 */
export function useTabContentGroup<P extends UseTabPanelsProps>(props: P) {
  const context = useTabsContext()

  const { id, selectedValue } = context

  const validChildren = getValidChildren(props.children)

  const children = validChildren.map((child, index) =>
    createElement(
      TabContentProvider,
      {
        key: index,
        value: {
          isSelected: child.props.value === selectedValue,
          id: makeTabPanelId(id, child.props.value),
          tabId: makeTabId(id, child.props.value),
          selectedValue,
        },
      },
      child,
    ),
  )

  return { ...props, children }
}
