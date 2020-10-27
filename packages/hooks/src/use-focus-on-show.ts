import {
  contains,
  focus,
  FocusableElement,
  getAllFocusable,
} from "@chakra-ui/utils"
import * as React from "react"
import { useEventListener } from "./use-event-listener"
import { useLatestRef } from "./use-latest-ref"

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
  const element = target && "current" in target ? target.current : target

  const autoFocus = shouldFocus && visible

  const onFocus = () => {
    if (
      !element ||
      !autoFocus ||
      contains(element, document.activeElement as HTMLElement)
    )
      return

    if (focusRef?.current) {
      focus(focusRef.current, { preventScroll })
    } else {
      const tabbableEls = getAllFocusable(element)
      if (tabbableEls.length > 0) {
        focus(tabbableEls[0], { preventScroll })
      }
    }
  }

  const onFocusRef = useLatestRef(onFocus)

  React.useEffect(() => {
    onFocusRef.current()
  }, [onFocusRef.current])

  useEventListener("transitionend", onFocus, element)
}
