import { nextById, prevById, queryAll } from "@zag-js/dom-utils"
import { useCallback, useRef } from "react"
import { useTabsContext } from "./tabs-context"
import { makeTabId } from "./use-tabs"

export function useTabList() {
  const { id, focusedValue, orientation, direction } = useTabsContext()

  const tabListRef = useRef<HTMLDivElement>(null)

  const allTabNodes = useCallback(() => {
    return queryAll(tabListRef.current, `[role='tab']:not([disabled])`)
  }, [])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const nextTab = () => {
        const next = nextById(allTabNodes(), makeTabId(id, focusedValue), true)
        if (next) next?.focus()
      }
      const prevTab = () => {
        const prev = prevById(allTabNodes(), makeTabId(id, focusedValue), true)
        if (prev) prev?.focus()
      }
      const firstTab = () => {
        const first = tabListRef.current?.querySelector<HTMLDivElement>(
          `[role=tab]:not([disabled]):first-of-type`,
        )
        if (first) first.focus()
      }
      const lastTab = () => {
        const last = tabListRef.current?.querySelector<HTMLDivElement>(
          `[role=tab]:not([disabled]):last-of-type`,
        )
        if (last) last.focus()
      }

      const isHorizontal = orientation === "horizontal"
      const isVertical = orientation === "vertical"

      const eventKey = event.key

      const ArrowStart = direction === "ltr" ? "ArrowLeft" : "ArrowRight"
      const ArrowEnd = direction === "ltr" ? "ArrowRight" : "ArrowLeft"

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        [ArrowStart]: () => isHorizontal && prevTab(),
        [ArrowEnd]: () => isHorizontal && nextTab(),
        ArrowDown: () => isVertical && nextTab(),
        ArrowUp: () => isVertical && prevTab(),
        Home: firstTab,
        End: lastTab,
      }

      const action = keyMap[eventKey]

      if (action) {
        event.preventDefault()
        action(event)
      }
    },
    [allTabNodes, focusedValue, id, orientation, direction],
  )

  return {
    ref: tabListRef,
    role: "tablist",
    "aria-orientation": orientation,
    onKeyDown,
  }
}

export type UseTabListReturn = ReturnType<typeof useTabList>
