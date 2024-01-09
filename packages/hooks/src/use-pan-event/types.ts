export interface Point {
  x: number
  y: number
}

/**
 * The event information passed to pan event handlers like `onPan`, `onPanStart`.
 *
 * It contains information about the current state of the tap gesture such as its
 * `point`, `delta`, and `offset`
 */
interface PanEventInfo {
  /**
   * Contains `x` and `y` values for the current pan position relative
   * to the device or page.
   */
  point: Point
  /**
   * Contains `x` and `y` values for the distance moved since
   * the last pan event.
   */
  delta: Point
  /**
   * Contains `x` and `y` values for the distance moved from
   * the first pan event.
   */
  offset: Point
  /**
   * Contains `x` and `y` values for the current velocity of the pointer.
   */
  velocity: Point
}

export type AnyPointerEvent = TouchEvent | MouseEvent | PointerEvent

export interface PointerEventInfo {
  point: Point
}

export interface PanEventHandler {
  (event: AnyPointerEvent, info: PanEventInfo): void
}

export interface TimestampedPoint extends Point {
  timestamp: number
}

export interface PanEventHandlers {
  /**
   * Callback fired when the pan session is created.
   * This is typically called once `pointerdown` event is fired.
   */
  onSessionStart: PanEventHandler
  /**
   * Callback fired when the pan session is detached.
   * This is typically called once `pointerup` event is fired.
   */
  onSessionEnd: PanEventHandler
  /**
   * Callback fired when the pan session has started.
   * The pan session when the pan offset is greater than
   * the threshold (allowable move distance to detect pan)
   */
  onStart: PanEventHandler
  /**
   * Callback fired while panning
   */
  onMove: PanEventHandler
  /**
   * Callback fired when the current pan session has ended.
   * This is typically called once `pointerup` event is fired.
   */
  onEnd: PanEventHandler
}

export type PanEventHistory = TimestampedPoint[]

export interface PanEventOptions {
  threshold?: number
  window?: Window
}
