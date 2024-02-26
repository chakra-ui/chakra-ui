import { getValidChildren } from "@chakra-ui/utils/children"
import { createElement } from "react"
import { TabContentProvider, useTabsContext } from "./tabs-context"
import { makeTabId, makeTabPanelId } from "./use-tabs"

export interface UseTabPanelsProps {
  children?: React.ReactNode
}

export function useTabContentGroup<P extends UseTabPanelsProps>(props: P) {
  const context = useTabsContext()

  const { id, selectedIndex } = context

  const validChildren = getValidChildren(props.children)

  const children = validChildren.map((child, index) =>
    createElement(
      TabContentProvider,
      {
        key: index,
        value: {
          isSelected: index === selectedIndex,
          id: makeTabPanelId(id, index),
          tabId: makeTabId(id, index),
          selectedIndex,
        },
      },
      child,
    ),
  )

  return { ...props, children }
}
