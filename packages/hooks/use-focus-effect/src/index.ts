import {
  FocusableElement,
  getActiveElement,
  getAllFocusable,
  isTabbable,
} from "@chakra-ui/dom-utils"
import { useEventListener } from "@chakra-ui/react-use-event-listener"
import { useSafeLayoutEffect } from "@chakra-ui/react-use-safe-layout-effect"
import { useUpdateEffect } from "@chakra-ui/react-use-update-effect"
import type { RefObject } from "react"
import { useCallback, useRef } from "react"

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
  if (el.contains(activeElement)) return false
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
      requestAnimationFrame(() => {
        el.focus()
      })
    }
  }, [shouldFocus, containerRef, focusRef])
}

export interface UseFocusOnShowOptions {
  visible?: boolean
  shouldFocus?: boolean
  preventScroll?: boolean
  focusRef?: React.RefObject<FocusableElement>
}

const defaultOptions: UseFocusOnShowOptions = {
  preventScroll: true,
  shouldFocus: false,
}

export function useFocusOnShow<T extends HTMLElement>(
  target: React.RefObject<T> | T,
  options = defaultOptions,
) {
  const { focusRef, preventScroll, shouldFocus, visible } = options
  const element = isRefObject(target) ? target.current : target

  const autoFocusValue = shouldFocus && visible
  const autoFocusRef = useRef(autoFocusValue)
  const lastVisibleRef = useRef(visible)

  useSafeLayoutEffect(() => {
    if (!lastVisibleRef.current && visible) {
      autoFocusRef.current = autoFocusValue
    }
    lastVisibleRef.current = visible
  }, [visible, autoFocusValue])

  const onFocus = useCallback(() => {
    if (!visible || !element || !autoFocusRef.current) return
    autoFocusRef.current = false

    if (element.contains(document.activeElement as HTMLElement)) return

    if (focusRef?.current) {
      requestAnimationFrame(() => {
        focusRef.current?.focus({ preventScroll })
      })
    } else {
      const tabbableEls = getAllFocusable(element)
      if (tabbableEls.length > 0) {
        requestAnimationFrame(() => {
          tabbableEls[0].focus({ preventScroll })
        })
      }
    }
  }, [visible, preventScroll, element, focusRef])

  useUpdateEffect(() => {
    onFocus()
  }, [onFocus])

  useEventListener(element, "transitionend", onFocus)
}

function isRefObject(val: any): val is { current: any } {
  return "current" in val
}
