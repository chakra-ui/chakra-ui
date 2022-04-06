import {
  contains,
  detectBrowser,
  focus,
  getOwnerDocument,
  isActiveElement,
  isRefObject,
} from "@chakra-ui/utils"
import { RefObject } from "react"
import { usePointerEvent } from "./use-pointer-event"

export interface UseFocusOnMouseDownProps {
  enabled?: boolean
  ref: RefObject<HTMLElement>
  elements?: Array<RefObject<HTMLElement> | HTMLElement | null>
}

/**
 * Polyfill to get `relatedTarget` working correctly consistently
 * across all browsers.
 *
 * It ensures that elements receives focus on pointer down if
 * it's not the active element.
 *
 * @internal
 */
export function useFocusOnPointerDown(props: UseFocusOnMouseDownProps) {
  const { ref, elements, enabled } = props

  const isSafari = detectBrowser("Safari")
  const doc = () => getOwnerDocument(ref.current)

  usePointerEvent(doc, "pointerdown", (event) => {
    if (!isSafari || !enabled) return
    const target = event.target as HTMLElement

    const els = elements ?? [ref]
    const isValidTarget = els.some((elementOrRef) => {
      const el = isRefObject(elementOrRef) ? elementOrRef.current : elementOrRef
      return contains(el, target)
    })

    if (!isActiveElement(target) && isValidTarget) {
      event.preventDefault()
      focus(target)
    }
  })
}
