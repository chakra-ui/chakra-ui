import { useEventListener, useLatestRef } from "@chakra-ui/hooks"
import { focus, FocusableElement, getAllFocusable } from "@chakra-ui/utils"
import * as React from "react"

function useConditionalFocus<T extends HTMLElement>(
  target: React.RefObject<T> | T,
  shouldFocus = false,
  options = defaultOptions,
) {
  const { focusRef, preventScroll } = options
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

const defaultOptions: UseConditionalFocusOptions = {
  preventScroll: true,
}

export type UseConditionalFocusOptions = {
  preventScroll?: boolean
  focusRef?: React.RefObject<FocusableElement>
}

export default useConditionalFocus
