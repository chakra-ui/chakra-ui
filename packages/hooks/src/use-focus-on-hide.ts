import {
  contains,
  focus,
  FocusableElement,
  getActiveElement,
  isTabbable,
} from "@chakra-ui/utils"
import { RefObject } from "react"
import { useUpdateEffect } from "./use-update-effect"

export interface UseFocusOnHideOptions {
  focusRef: RefObject<FocusableElement>
  shouldFocus?: boolean
  visible?: boolean
}

function preventReturnFocus(containerRef: React.RefObject<HTMLElement>) {
  const el = containerRef.current
  if (!el) return false

  const activeElement = getActiveElement(el)

  if (!activeElement) return false
  if (contains(el, activeElement)) return false
  if (isTabbable(activeElement)) return true

  return false
}

/**
 * Popover hook to manage the focus when the popover closes or hides.
 *
 * We either want to return focus back to the popover trigger or
 * let focus proceed normally if user moved to another interactive
 * element in the viewport.
 */
export function useFocusOnHide(
  containerRef: RefObject<HTMLElement>,
  options: UseFocusOnHideOptions,
) {
  const { shouldFocus: shouldFocusProp, visible, focusRef } = options

  const shouldFocus = shouldFocusProp && !visible

  useUpdateEffect(() => {
    if (!shouldFocus) return

    if (preventReturnFocus(containerRef)) {
      return
    }

    const el = focusRef?.current || containerRef.current

    if (el) {
      focus(el, { nextTick: true })
    }
  }, [shouldFocus, containerRef, focusRef])
}
