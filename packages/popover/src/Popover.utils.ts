import { useUpdateEffect, useEventListener } from "@chakra-ui/hooks"
import { ensureFocus, getFirstTabbableIn, isTabbable } from "@chakra-ui/utils"
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
  triggerRef: React.RefObject<HTMLButtonElement>,
  popoverRef: React.RefObject<HTMLElement>,
  options: {
    action: () => void
    visible: boolean
  },
) {
  const onMouseDown = (event: MouseEvent) => {
    if (options.visible && event.target === triggerRef.current) {
      event.preventDefault()
    }
  }

  /**
   * @todo consider using pointer events instead
   */
  useEventListener("mousedown", onMouseDown)
  useEventListener("touchstart", onMouseDown)

  return (event: React.FocusEvent) => {
    const shouldClose = options.visible && !hasFocusWithin(popoverRef, event)

    if (shouldClose) {
      options.action()
    }
  }
}

export interface FocusOnHideHookOptions {
  focusRef: React.RefObject<HTMLElement>
  autoFocus?: boolean
  visible?: boolean
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
  options: FocusOnHideHookOptions,
) {
  const { focusRef, autoFocus, visible } = options

  const shouldFocus = autoFocus && !visible

  /**
   * If the popover was closed by clicking on another
   * element that's tabbable (like, another button),
   * we want focus to proceed normally, not return
   * focus to the trigger.
   */
  const [isTabbableTarget, setIsTabbableTarget] = React.useState(false)

  const onMouseDown = (event: MouseEvent) => {
    if (!options.visible) return

    const target = event.target as HTMLElement

    if (target !== focusRef.current && !popoverRef.current?.contains(target)) {
      setIsTabbableTarget(isTabbable(target))
    }
  }

  /**
   * Setup mousedown and touchstart listeners
   * @todo maybe just use pointerdown with pep.js polyfill?
   */
  useEventListener("mousedown", onMouseDown)
  useEventListener("touchstart", onMouseDown)

  /**
   * Using updateEffect here to allow effect to run only when
   * `options.visible` changes, not on mount
   */
  useUpdateEffect(() => {
    if (!shouldFocus || !popoverRef.current) return

    if (isTabbableTarget) return

    if (focusRef.current) {
      ensureFocus(focusRef.current)
    }
  }, [autoFocus, focusRef, visible, popoverRef])
}

export interface FocusOnShowHookOptions {
  autoFocus?: boolean
  visible?: boolean
  focusRef?: React.RefObject<HTMLElement>
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
  options: FocusOnShowHookOptions,
) {
  const { visible, autoFocus, focusRef } = options

  /**
   * Using updateEffect here to allow effect to run only when
   * `options.visible` changes, not on mount
   */
  useUpdateEffect(() => {
    const shouldFocus = visible && autoFocus

    if (!shouldFocus) return

    if (focusRef?.current) {
      ensureFocus(focusRef.current)
      return
    }

    if (popoverRef.current) {
      const firstTabbable = getFirstTabbableIn(popoverRef.current, true)
      ensureFocus(firstTabbable ?? popoverRef.current)
    }
  }, [visible, autoFocus, popoverRef, focusRef])
}
