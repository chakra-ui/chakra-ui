import { useEventListener, useUpdateEffect } from "@chakra-ui/hooks"
import { focus, FocusableElement, isFocusable } from "@chakra-ui/utils"
import { RefObject, useRef } from "react"

export interface UseFocusOnHideOptions {
  focusRef: RefObject<FocusableElement>
  autoFocus?: boolean
  visible?: boolean
  trigger?: "hover" | "click"
}

/**
 * Popover hook to manage the focus when the popover closes or hides.
 *
 * We either want to return focus back to the popover trigger or
 * let focus proceed normally if user moved to another interactive
 * element in the viewport.
 */
export function useFocusOnHide(
  popoverRef: RefObject<HTMLElement>,
  options: UseFocusOnHideOptions,
) {
  const isFocusableRef = useRef(false)
  const { focusRef, autoFocus, visible, trigger } = options

  const shouldFocus = autoFocus && !visible && trigger === "click"

  const onPointerDown = (event: MouseEvent | TouchEvent) => {
    if (!options.visible) return
    const target = event.target as HTMLElement

    const prevent =
      isFocusable(target) &&
      target !== focusRef.current &&
      !(popoverRef.current as HTMLElement).contains(target)

    if (prevent) {
      isFocusableRef.current = true
    }
  }

  useEventListener("mousedown", onPointerDown)
  useEventListener("touchstart", onPointerDown)

  useUpdateEffect(() => {
    return () => {
      if (!visible) {
        isFocusableRef.current = false
      }
    }
  }, [visible])

  useEventListener(
    "transitionend",
    () => {
      if (!visible && focusRef.current && !isFocusableRef.current) {
        focus(focusRef.current)
      }
    },
    popoverRef.current,
  )

  /**
   * Using updateEffect here to allow effect to run only when
   * `options.visible` changes, not on mount
   */
  useUpdateEffect(() => {
    if (!shouldFocus || !popoverRef.current) return

    if (isFocusableRef.current) return

    if (focusRef.current) {
      focus(focusRef.current)
    }
  }, [autoFocus, focusRef, visible, popoverRef, shouldFocus])
}
