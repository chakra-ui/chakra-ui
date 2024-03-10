import { createContext, lazyDisclosure } from "@chakra-ui/utils"
import { useRef } from "react"

export interface RenderStrategyProps {
  /**
   * Performance 🚀:
   * If `true`, defer rendering the children until the component is visible.
   *
   * @default false
   */
  isLazy?: boolean
  /**
   * Performance 🚀:
   * The lazy behavior when not visible. only works when `isLazy={true}`
   * - "unmount": The menu's content is always unmounted when not open.
   * - "keepMounted": The menu's content initially unmounted,
   * but stays mounted when menu is open.
   *
   * @default "unmount"
   */
  lazyBehavior?: "unmount" | "keepMounted"
  /**
   * Whether the component is visible or not
   */
  visible?: boolean
}

export function useRenderStrategy(props: RenderStrategyProps) {
  const { isLazy, lazyBehavior, visible } = props

  const wasVisible = useRef(false)

  if (visible) {
    wasVisible.current = true
  }

  const shouldRenderChildren = lazyDisclosure({
    wasSelected: wasVisible.current,
    isSelected: visible,
    enabled: isLazy,
    mode: lazyBehavior,
  })

  return {
    unmounted: !shouldRenderChildren,
    hidden: !visible,
  }
}

export type UseRenderStrategyReturn = ReturnType<typeof useRenderStrategy>

export const [RenderStrategyProvider, useRenderStrategyContext] =
  createContext<UseRenderStrategyReturn>({
    name: "RenderStrategyContext",
    strict: true,
  })
