"use client"

import { lazyDisclosure } from "@chakra-ui/utils"
import { useRef } from "react"
import { createContext } from "../create-context"

export interface RenderStrategyProps {
  /**
   * Performance 🚀:
   * If `true`, defer rendering the children until the component is visible.
   *
   * @default false
   */
  lazyMount?: boolean
  /**
   * Performance 🚀:
   * The lazy behavior when not visible. only works when `lazyMount={true}`
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
  const { lazyMount, lazyBehavior, visible } = props

  const wasVisible = useRef(false)

  if (visible) {
    wasVisible.current = true
  }

  const shouldRenderChildren = lazyDisclosure({
    wasSelected: wasVisible.current,
    isSelected: visible,
    enabled: lazyMount,
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
