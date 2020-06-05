import * as React from "react"
import ReactFocusLock from "react-focus-lock"

export type FocusLockProps = {
  /**
   * `ref` of the element to receive focus initially
   */
  initialFocusRef?: React.RefObject<HTMLElement>
  /**
   * `ref` of the element to return focus to when `FocusLock`
   * unmounts
   */
  finalFocusRef?: React.RefObject<HTMLElement>
  /**
   * If `true`, focus will be restored to the element that
   * triggered the `FocusLock` once it unmounts
   */
  restoreFocus?: boolean
  /**
   * The component to render
   */
  children: React.ReactNode
  /**
   * If `true`, focus trapping will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true`, the first focuable element within the `children`
   * will ne auto-focused once `FocusLock` mounts
   */
  autoFocus?: boolean
}

/**
 * React component to trap focus within an element or component.
 * Mostly used in Modals, Popovers, etc.
 *
 * @see Docs https://chakra-ui.com/components/focuslock
 */
export function FocusLock(props: FocusLockProps) {
  const {
    initialFocusRef,
    finalFocusRef,
    restoreFocus,
    children,
    isDisabled,
    autoFocus = true,
  } = props

  const onActivation = React.useCallback(() => {
    initialFocusRef?.current?.focus()
  }, [initialFocusRef])

  const onDeactivation = React.useCallback(() => {
    finalFocusRef?.current?.focus()
  }, [finalFocusRef])

  const returnFocus = restoreFocus && !finalFocusRef

  return (
    <ReactFocusLock
      autoFocus={autoFocus}
      disabled={isDisabled}
      onActivation={onActivation}
      onDeactivation={onDeactivation}
      returnFocus={returnFocus}
    >
      {children}
    </ReactFocusLock>
  )
}
