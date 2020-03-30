import { useUpdateEffect, useEventListener } from "@chakra-ui/hooks"
import {
  ensureFocus,
  getAllTabbable,
  getFirstTabbableIn,
  isTabbable,
} from "@chakra-ui/utils"
import * as React from "react"

export function hasFocusWithin(
  ref: React.RefObject<HTMLElement>,
  event: React.FocusEvent,
) {
  if (!document.activeElement || !ref.current) {
    return false
  }
  const target = (event.relatedTarget || document.activeElement) as HTMLElement
  return ref.current.contains(target)
}

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

  useEventListener("mousedown", onMouseDown)

  return (event: React.FocusEvent) => {
    const shouldClose = options.visible && !hasFocusWithin(popoverRef, event)
    if (shouldClose) {
      options.action()
    }
  }
}

export function useFocusOnHide(
  ref: React.RefObject<HTMLElement>,
  options: any,
) {
  const { focusRef, autoFocus, visible } = options
  const shouldFocus = autoFocus && !visible

  /**
   * If the popover was closed by clicking on another
   * element that's tabbable (like, another button),
   * we want focus to proceed normally, not return
   * focus to the trigger.
   */
  const targetIsTabbableRef = React.useRef(false)

  const onMouseDown = (event: MouseEvent) => {
    if (options.visible && event.target !== focusRef.current) {
      targetIsTabbableRef.current = isTabbable(event.target as HTMLElement)
    }
  }

  /**
   * Setup mousedown and touchstart listeners
   * @todo maybe just use pointerdown with pep.js polyfill?
   */
  useEventListener("mousedown", onMouseDown)
  useEventListener("touchstart", onMouseDown)

  useUpdateEffect(() => {
    const element = ref.current

    if (!shouldFocus || !element) {
      return undefined
    }

    const preventFocus =
      document.activeElement &&
      element &&
      !element.contains(document.activeElement) &&
      isTabbable(document.activeElement)

    if (preventFocus || targetIsTabbableRef.current) {
      return
    }

    focusRef?.current?.focus()
  }, [autoFocus, focusRef, visible, ref])
}

export function getElementAfterTrigger(
  triggerRef: React.RefObject<HTMLElement>,
) {
  if (!triggerRef.current) return
  const elements = document && getAllTabbable(document.body)
  const targetIndex =
    elements && triggerRef.current ? elements.indexOf(triggerRef.current) : -1
  return elements && elements[targetIndex + 1]
}

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
