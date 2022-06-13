import { focus } from "@chakra-ui/utils/focus"
import { FocusableElement } from "@chakra-ui/utils/tabbable"
import { isRefObject } from "@chakra-ui/utils/assertion"
import { contains } from "@chakra-ui/utils/dom"
import { getAllFocusable } from "@chakra-ui/utils/dom-query"
import React, { useCallback } from "react"
import { useEventListener } from "./use-event-listener"
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

  const autoFocus = shouldFocus && visible

  const onFocus = useCallback(() => {
    if (!element || !autoFocus) return

    if (contains(element, document.activeElement as HTMLElement)) return

    if (focusRef?.current) {
      focus(focusRef.current, { preventScroll, nextTick: true })
    } else {
      const tabbableEls = getAllFocusable(element)
      if (tabbableEls.length > 0) {
        focus(tabbableEls[0], { preventScroll, nextTick: true })
      }
    }
  }, [autoFocus, preventScroll, element, focusRef])

  useUpdateEffect(() => {
    onFocus()
  }, [onFocus])

  useEventListener("transitionend", onFocus, element)
}
