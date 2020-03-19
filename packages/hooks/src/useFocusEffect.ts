import * as React from "react"
import { hasFocusWithin, ensureFocus } from "@chakra-ui/utils"
import { useUpdateEffect } from "./useUpdateEffect"

/**
 * React hook to focus an element conditionally
 *
 * @param ref the ref of the element to focus
 * @param options focus management options
 */
export function useFocusEffect<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: { shouldFocus: boolean; preventScroll?: boolean },
) {
  const { shouldFocus, preventScroll } = options

  useUpdateEffect(() => {
    const node = ref.current

    if (!node || !shouldFocus) return

    if (!hasFocusWithin(node)) {
      ensureFocus(node, { preventScroll })
    }
  }, [shouldFocus, ref])
}
