import * as React from "react"
import ReactFocusLock from "react-focus-lock"

export interface FocusLockProps {
  initialFocusRef?: React.RefObject<HTMLElement>
  finalFocusRef?: React.RefObject<HTMLElement>
  restoreFocus?: boolean
  children: React.ReactNode
}

export function FocusLock(props: FocusLockProps) {
  const { initialFocusRef, finalFocusRef, restoreFocus, children } = props

  const onActivation = React.useCallback(() => {
    initialFocusRef?.current?.focus()
  }, [initialFocusRef])

  const onDeactivation = React.useCallback(() => {
    finalFocusRef?.current?.focus()
  }, [finalFocusRef])

  const returnFocus = restoreFocus && !finalFocusRef

  return (
    <ReactFocusLock
      onActivation={onActivation}
      onDeactivation={onDeactivation}
      returnFocus={returnFocus}
    >
      {children}
    </ReactFocusLock>
  )
}
