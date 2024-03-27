import { lazyDisclosure } from "@chakra-ui/utils/lazy"
import { useRef } from "react"
import { useTabContentContext, useTabsContext } from "./tabs-context"

/**
 * Tabs hook for managing the visible/hidden states
 * of the tab panel.
 *
 * @param props props object for the tab panel
 */
export function useTabContent(props: Record<string, any>) {
  const { children, value, ...htmlProps } = props
  const { isLazy, lazyBehavior } = useTabsContext()
  const { isSelected, id, tabId } = useTabContentContext()

  const hasBeenSelected = useRef(false)
  if (isSelected) {
    hasBeenSelected.current = true
  }

  const shouldRenderChildren = lazyDisclosure({
    wasSelected: hasBeenSelected.current,
    isSelected,
    enabled: isLazy,
    mode: lazyBehavior,
  })

  return {
    // Puts the tabpanel in the page `Tab` sequence.
    tabIndex: 0,
    ...htmlProps,
    children: shouldRenderChildren ? children : null,
    role: "tabpanel",
    "aria-labelledby": tabId,
    hidden: !isSelected,
    id,
  }
}
