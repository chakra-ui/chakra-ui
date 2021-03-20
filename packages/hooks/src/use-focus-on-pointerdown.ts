import {
  detectBrowser,
  focus,
  isActiveElement,
  isRefObject,
} from "@chakra-ui/utils"
import { RefObject } from "react"
import { usePointerEvent } from "./use-pointer-event"

export interface UseFocusOnMouseDownProps {
  doc: Document | null
  elements: Array<RefObject<HTMLElement> | HTMLElement | null>
}

/**
 * Polyfill to get `relatedTarget` working correctly consistently
 * across all browsers.
 *
 * It ensures that elements receives focus on pointer down if
 * it's not the active active element.
 *
 * @internal
 */
export function useFocusOnPointerDown(props: UseFocusOnMouseDownProps) {
  const { doc, elements } = props

  const isSafari = detectBrowser("Safari")

  usePointerEvent(doc, "pointerdown", (event) => {
    if (!isSafari) return
    const target = event.target as HTMLElement
    const isValidTarget = elements.some((element) => {
      if (isRefObject(element)) {
        return target === element.current
      }
      return target === element
    })

    if (!isActiveElement(target) && isValidTarget) {
      focus(target)
    }
  })
}
