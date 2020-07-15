import { useUpdateEffect, useEventListener } from "@chakra-ui/hooks"
import { focus, getFirstTabbableIn, isFocusable } from "@chakra-ui/utils"
import * as React from "react"

/**
 * Check if the event target is within the popover ref.
 *
 * @param ref the popover ref
 * @param event the blur event
 */
export function hasFocusWithin(
  popoverRef: React.RefObject<HTMLElement>,
  event: React.FocusEvent,
) {
  if (!document.activeElement || !popoverRef.current) {
    return false
  }

  const target = (event.relatedTarget || document.activeElement) as HTMLElement

  return popoverRef.current.contains(target)
}

/**
 * Popover hook to manage outside click or blur detection.
 * It listens for outside click and notifies us so we can
 * close the popover
 *
 * @param triggerRef - popover trigger ref
 * @param popoverRef - popover content ref
 * @param options popover options (visible and action)
 */
export function useBlurOutside(
  triggerRef: React.RefObject<HTMLElement>,
  popoverRef: React.RefObject<HTMLElement>,
  options: {
    action: () => void
    visible: boolean
  },
) {
  const onMouseDown = (event: MouseEvent) => {
    if (
      options.visible &&
      triggerRef.current?.contains(event.target as HTMLElement)
    ) {
      event.preventDefault()
    }
  }

  useEventListener("mousedown", onMouseDown)
  useEventListener("touchstart", onMouseDown)

  return (event: React.FocusEvent) => {
    const shouldClose = options.visible && !hasFocusWithin(popoverRef, event)

    if (shouldClose) {
      options.action()
    }
  }
}

export interface UseFocusOnHideOptions {
  focusRef: React.RefObject<HTMLElement>
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
  popoverRef: React.RefObject<HTMLElement>,
  options: UseFocusOnHideOptions,
) {
  const isFocusableRef = React.useRef(false)
  const { focusRef, autoFocus, visible, trigger } = options

  const shouldFocus = autoFocus && !visible && trigger === "click"

  const onMouseDown = (event: MouseEvent) => {
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

  useEventListener("mousedown", onMouseDown)

  useUpdateEffect(() => {
    return () => {
      if (!visible) {
        isFocusableRef.current = false
      }
    }
  }, [visible])

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

interface UseFocusOnShowOptions {
  autoFocus?: boolean
  visible?: boolean
  focusRef?: React.RefObject<HTMLElement>
  trigger?: "hover" | "click"
}

/**
 * Popover hook to manage the focus when the popover opens.
 *
 * We either want to focus the popover content itself since it
 * has `tabIndex = -1`, or focus the first interactive element
 * within the popover content.
 */
export function useFocusOnShow(
  popoverRef: React.RefObject<HTMLElement>,
  options: UseFocusOnShowOptions,
) {
  const { visible, autoFocus, focusRef, trigger } = options

  /**
   * Using updateEffect here to allow effect to run only when
   * `options.visible` changes, not on mount
   */
  useUpdateEffect(() => {
    if (trigger === "hover") return

    // if `autoFocus` is false, move focus to the `PopoverContent`
    if (!autoFocus && popoverRef.current) {
      focus(popoverRef.current)
      return
    }

    const shouldFocus = visible && autoFocus

    if (!shouldFocus) return

    if (focusRef?.current) {
      focus(focusRef.current)
      return
    }

    if (popoverRef.current) {
      const firstTabbable = getFirstTabbableIn(popoverRef.current, true)
      focus(firstTabbable ?? popoverRef.current)
    }
  }, [visible, autoFocus, popoverRef, focusRef])
}
