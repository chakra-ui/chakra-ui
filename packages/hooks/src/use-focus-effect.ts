import * as React from "react"
import { focus } from "@chakra-ui/utils/focus"
import { hasFocusWithin } from "@chakra-ui/utils/tabbable"
import { useUpdateEffect } from "./use-update-effect"

export type UseFocusEffectOptions = {
  shouldFocus: boolean
  preventScroll?: boolean
}
/**
 * React hook to focus an element conditionally
 *
 * @param ref the ref of the element to focus
 * @param options focus management options
 */
export function useFocusEffect<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: UseFocusEffectOptions,
) {
  const { shouldFocus, preventScroll } = options

  useUpdateEffect(() => {
    const node = ref.current

    if (!node || !shouldFocus) return

    if (!hasFocusWithin(node)) {
      focus(node, { preventScroll, nextTick: true })
    }
  }, [shouldFocus, ref, preventScroll])
}
