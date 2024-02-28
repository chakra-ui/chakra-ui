import { callAllHandlers } from "@chakra-ui/utils/call-all"
import { useCallback } from "react"
import { useTabsContext, useTabsDescendantsContext } from "./tabs-context"

export interface UseTabListProps {
  children?: React.ReactNode
  onKeyDown?: React.KeyboardEventHandler
  ref?: React.Ref<any>
}

export function useTabList<P extends UseTabListProps>(props: P) {
  const { focusedIndex, orientation, direction } = useTabsContext()

  const descendants = useTabsDescendantsContext()

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const nextTab = () => {
        const next = descendants.nextEnabled(focusedIndex)
        if (next) next.node?.focus()
      }
      const prevTab = () => {
        const prev = descendants.prevEnabled(focusedIndex)
        if (prev) prev.node?.focus()
      }
      const firstTab = () => {
        const first = descendants.firstEnabled()
        if (first) first.node?.focus()
      }
      const lastTab = () => {
        const last = descendants.lastEnabled()
        if (last) last.node?.focus()
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
    [descendants, focusedIndex, orientation, direction],
  )

  return {
    ...props,
    role: "tablist",
    "aria-orientation": orientation,
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

export type UseTabListReturn = ReturnType<typeof useTabList>
