import { getAllFocusable } from "@chakra-ui/utils"
import { useCallback } from "react"
import ReactFocusLock from "react-focus-lock"

const FocusTrap: typeof ReactFocusLock =
  (ReactFocusLock as any).default ?? ReactFocusLock

interface FocusableElement {
  focus(options?: FocusOptions): void
}
export interface FocusLockProps {
  /**
   * `ref` of the element to receive focus initially
   */
  initialFocusRef?: React.RefObject<FocusableElement>
  /**
   * `ref` of the element to return focus to when `FocusLock`
   * unmounts
   */
  finalFocusRef?: React.RefObject<FocusableElement>
  /**
   * The `ref` of the wrapper for which the focus-lock wraps
   */
  contentRef?: React.RefObject<HTMLElement>
  /**
   * If `true`, focus will be restored to the element that
   * triggered the `FocusLock` once it unmounts
   *
   * @default false
   */
  restoreFocus?: boolean
  /**
   * If `true`, focus trapping will be disabled
   *
   * @default false
   */
  isDisabled?: boolean
  /**
   * If `true`, the first focusable element within the `children`
   * will auto-focused once `FocusLock` mounts
   *
   * @default false
   */
  autoFocus?: boolean
  /**
   * If `true`, disables text selections inside, and outside focus lock
   *
   * @default false
   */
  persistentFocus?: boolean
  /**
   * Enables aggressive focus capturing within iframes.
   * - If `true`: keep focus in the lock, no matter where lock is active
   * - If `false`:  allows focus to move outside of iframe
   *
   * @default false
   */
  lockFocusAcrossFrames?: boolean
}

type Props = FocusLockProps & {
  children?: React.ReactNode
}

export function FocusLock(props: Props) {
  const {
    initialFocusRef,
    finalFocusRef,
    contentRef,
    restoreFocus,
    children,
    isDisabled,
    autoFocus,
    persistentFocus,
    lockFocusAcrossFrames,
  } = props

  const onActivation = useCallback(() => {
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus()
    } else if (contentRef?.current) {
      const focusables = getAllFocusable(contentRef.current)
      if (focusables.length === 0) {
        requestAnimationFrame(() => {
          contentRef.current?.focus()
        })
      }
    }
  }, [initialFocusRef, contentRef])

  const onDeactivation = useCallback(() => {
    finalFocusRef?.current?.focus()
  }, [finalFocusRef])

  const returnFocus = restoreFocus && !finalFocusRef

  return (
    <FocusTrap
      crossFrame={lockFocusAcrossFrames}
      persistentFocus={persistentFocus}
      autoFocus={autoFocus}
      disabled={isDisabled}
      onActivation={onActivation}
      onDeactivation={onDeactivation}
      returnFocus={returnFocus}
    >
      {children}
    </FocusTrap>
  )
}

FocusLock.displayName = "FocusLock"
