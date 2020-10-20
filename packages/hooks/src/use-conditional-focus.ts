import { focus, FocusableElement, getAllFocusable } from "@chakra-ui/utils"
import * as React from "react"
import { useEventListener } from "./use-event-listener"
import { useLatestRef } from "./use-latest-ref"

export type UseConditionalFocusOptions = {
  shouldFocus?: boolean
  preventScroll?: boolean
  focusRef?: React.RefObject<FocusableElement>
}

const defaultOptions: UseConditionalFocusOptions = {
  preventScroll: true,
  shouldFocus: false,
}

export function useConditionalFocus<T extends HTMLElement>(
  target: React.RefObject<T> | T,
  options = defaultOptions,
) {
  const { focusRef, preventScroll, shouldFocus } = options
  const element = target && "current" in target ? target.current : target

  const onFocus = () => {
    if (!element || !shouldFocus) return

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
  }, [onFocusRef, shouldFocus])

  useEventListener("transitionend", onFocus, element)
}
