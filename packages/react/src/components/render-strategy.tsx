import { lazyDisclosure } from "@chakra-ui/utils"
import { useRef } from "react"

export interface RenderStrategyProps {
  isLazy?: boolean
  lazyBehavior?: "unmount" | "keepMounted"
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
