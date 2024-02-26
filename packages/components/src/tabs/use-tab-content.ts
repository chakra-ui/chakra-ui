import { lazyDisclosure } from "@chakra-ui/utils/lazy"
import { useRef } from "react"
import { useTabContentContext, useTabsContext } from "./tabs-context"

export function useTabContent(props: Record<string, any>) {
  const { children, ...htmlProps } = props
  const { isLazy, lazyBehavior } = useTabsContext()
  const { isSelected, id, tabId } = useTabContentContext()

  const wasEverSelected = useRef(false)

  if (isSelected) {
    wasEverSelected.current = true
  }

  const shouldRenderChildren = lazyDisclosure({
    wasSelected: wasEverSelected.current,
    isSelected,
    enabled: isLazy,
    mode: lazyBehavior,
  })

  return {
    tabIndex: 0,
    ...htmlProps,
    children: shouldRenderChildren ? children : null,
    role: "tabpanel",
    "aria-labelledby": tabId,
    hidden: !isSelected,
    id,
  }
}
