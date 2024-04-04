import { FocusLockProps } from "../focus-lock"

export type DialogScrollBehavior = "inside" | "outside"

export type DialogMotionPreset =
  | "slideInBottom"
  | "slideInRight"
  | "slideInTop"
  | "slideInLeft"
  | "scale"
  | "none"

interface FocusableElement {
  focus(options?: FocusOptions): void
}

export interface DialogOptions
  extends Pick<FocusLockProps, "lockFocusAcrossFrames"> {
  /**
   * If `false`, focus lock will be disabled completely.
   *
   * This is useful in situations where you still need to interact with
   * other surrounding elements.
   *
   * 🚨Warning: We don't recommend doing this because it hurts the
   * accessibility of the dialog, based on WAI-ARIA specifications.
   *
   * @default true
   */
  trapFocus?: boolean
  /**
   * If `true`, the dialog will autofocus the first enabled and interactive
   * element within the `DialogContent`
   *
   * @default true
   */
  autoFocus?: boolean
  /**
   * The `ref` of element to receive focus when the dialog opens.
   */
  initialFocusRef?: React.RefObject<FocusableElement>
  /**
   * The `ref` of element to receive focus when the dialog closes.
   */
  finalFocusRef?: React.RefObject<FocusableElement>
  /**
   * If `true`, the dialog will return focus to the element that triggered it when it closes.
   * @default true
   */
  returnFocusOnClose?: boolean
  /**
   * If `true`, scrolling will be disabled on the `body` when the dialog opens.
   * @default true
   */
  blockScrollOnMount?: boolean
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   * @default false.
   */
  allowPinchZoom?: boolean
  /**
   * If `true`, a `padding-right` will be applied to the body element
   * that's equal to the width of the scrollbar.
   *
   * This can help prevent some unpleasant flickering effect
   * and content adjustment when the dialog opens
   *
   * @default true
   */
  preserveScrollBarGap?: boolean
}
