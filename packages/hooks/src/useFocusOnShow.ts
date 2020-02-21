import { getFirstTabbableIn, ensureFocus } from "@chakra-ui/utils"
import * as React from "react"
import useUpdateEffect from "./useUpdateEffect"

export interface FocusOnShowHookOptions {
  autoFocus?: boolean
  visible?: boolean
  focusRef?: React.RefObject<HTMLElement>
}

export function useFocusOnShow(
  ref: React.RefObject<HTMLElement>,
  options: FocusOnShowHookOptions,
) {
  const { visible, autoFocus, focusRef } = options

  useUpdateEffect(() => {
    const shouldFocus = visible && autoFocus

    if (!shouldFocus) return

    if (focusRef?.current) {
      ensureFocus(focusRef.current)
      return
    }

    if (ref.current) {
      const firstTabbable = getFirstTabbableIn(ref.current, true)
      ensureFocus(firstTabbable ?? ref.current)
    }
  }, [visible, autoFocus, ref, focusRef])
}

export default useFocusOnShow
