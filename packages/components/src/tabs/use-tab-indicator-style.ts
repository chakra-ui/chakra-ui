import { useSafeLayoutEffect } from "@chakra-ui/hooks/use-safe-layout-effect"
import { useState } from "react"
import { useTabsContext, useTabsDescendantsContext } from "./tabs-context"

/**
 * Tabs hook to show an animated indicators that
 * follows the active tab.
 *
 * The way we do it is by measuring the DOM Rect (or dimensions)
 * of the active tab, and return that as CSS style for
 * the indicator.
 */

export function useTabIndicatorStyle(): React.CSSProperties {
  const context = useTabsContext()
  const descendants = useTabsDescendantsContext()

  const { selectedIndex, orientation } = context

  const isHorizontal = orientation === "horizontal"
  const isVertical = orientation === "vertical"

  // Get the clientRect of the selected tab
  const [rect, setRect] = useState(() => {
    if (isHorizontal) return { left: 0, width: 0 }
    if (isVertical) return { top: 0, height: 0 }
    return undefined
  })

  const [hasMeasured, setHasMeasured] = useState(false)

  // Update the selected tab rect when the selectedIndex changes
  useSafeLayoutEffect(() => {
    if (selectedIndex == null) return

    const tab = descendants.item(selectedIndex)
    if (tab == null) return

    // Horizontal Tab: Calculate width and left distance
    if (isHorizontal) {
      setRect({ left: tab.node.offsetLeft, width: tab.node.offsetWidth })
    }

    // Vertical Tab: Calculate height and top distance
    if (isVertical) {
      setRect({ top: tab.node.offsetTop, height: tab.node.offsetHeight })
    }

    // Prevent unwanted transition from 0 to measured rect
    // by setting the measured state in the next tick
    const id = requestAnimationFrame(() => {
      setHasMeasured(true)
    })

    return () => {
      if (id) {
        cancelAnimationFrame(id)
      }
    }
  }, [selectedIndex, isHorizontal, isVertical, descendants])

  return {
    position: "absolute",
    transitionProperty: "left, right, top, bottom, height, width",
    transitionDuration: hasMeasured ? "200ms" : "0ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    ...rect,
  }
}
