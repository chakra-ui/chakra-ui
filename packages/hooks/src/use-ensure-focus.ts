import { focus, isActiveElement } from "@chakra-ui/utils"
import { RefObject } from "react"
import { usePointerEvent } from "./use-pointer-event"

export interface UseEnsureFocusProps {
  doc: Document
  elements: Array<RefObject<HTMLElement> | HTMLElement | null>
}

const isRefObject = (val: any): val is { current: any } => "current" in val

/**
 * Polyfill to get `relatedTarget` working correctly consistently
 * across all browsers.
 *
 * It ensures that elements receives focus on pointer down if
 * it's not the active active element.
 *
 * @internal
 */
export function useEnsureFocus(props: UseEnsureFocusProps) {
  const { doc, elements } = props

  usePointerEvent(doc, "pointerdown", (event) => {
    const target = event.target as HTMLElement
    const isValidTarget = elements.some((element) => {
      if (isRefObject(element)) return target === element.current
      return target === element
    })

    if (!isActiveElement(target) && isValidTarget) {
      focus(target)
    }
  })
}
