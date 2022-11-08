import {
  contains,
  focus,
  FocusableElement,
  getAllFocusable,
  isRefObject,
} from "@chakra-ui/utils"
import { useCallback, useRef } from "react"
import { useEventListener } from "./use-event-listener"
import { useSafeLayoutEffect } from "./use-safe-layout-effect"
import { useUpdateEffect } from "./use-update-effect"

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

    if (contains(element, document.activeElement as HTMLElement)) return

    if (focusRef?.current) {
      focus(focusRef.current, { preventScroll, nextTick: true })
    } else {
      const tabbableEls = getAllFocusable(element)
      if (tabbableEls.length > 0) {
        focus(tabbableEls[0], { preventScroll, nextTick: true })
      }
    }
  }, [visible, preventScroll, element, focusRef])

  useUpdateEffect(() => {
    onFocus()
  }, [onFocus])

  useEventListener("transitionend", onFocus, element)
}
