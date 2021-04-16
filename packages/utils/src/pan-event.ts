/**
 * This is a modified version of `PanSession` from `framer-motion`.
 *
 * Credit goes to `framer-motion` of this useful utilities.
 * License can be found here: https://github.com/framer/motion
 */

import sync, { cancelSync } from "framesync"
import {
  isMouseEvent,
  extractEventInfo,
  addPointerEvent,
  AnyPointerEvent,
  Point,
  PointerEventInfo,
  isMultiTouchEvent,
} from "./pointer-event"
import { pipe, distance, noop } from "./function"

/**
 * The event information passed to pan event handlers like `onPan`, `onPanStart`.
 *
 * It contains information about the current state of the tap gesture such as its
 * `point`, `delta`, and `offset`
 */
export interface PanEventInfo {
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
}

export type PanHandler = (event: AnyPointerEvent, info: PanEventInfo) => void

export interface PanSessionHandlers {
  /**
   * Callback fired when the pan session is created.
   * This is typically called once `pointerdown` event is fired.
   */
  onSessionStart: PanHandler
  /**
   * Callback fired when the pan session has started.
   * The pan session when the pan offset is greater than
   * the threshold (allowable move distance to detect pan)
   */
  onStart: PanHandler
  /**
   * Callback fired while panning
   */
  onMove: PanHandler
  /**
   * Callback fired when the current pan session has end.
   * This is typically called once `pointerup` event is fired.
   */
  onEnd: PanHandler
}

/**
 * @internal
 *
 * A Pan Session is recognized when the pointer is down
 * and moved in the allowed direction.
 */
export class PanSession {
  /**
   * We use this to keep track of the `x` and `y` pan session history
   * as the pan event happens. It helps to calculate the `offset` and `delta`
   */
  private history: Point[] = []

  // The pointer event that started the pan session
  private startEvent: AnyPointerEvent | null = null

  // The current pointer event for the pan session
  private lastEvent: AnyPointerEvent | null = null

  // The current pointer event info for the pan session
  private lastEventInfo: PointerEventInfo | null = null

  private handlers: Partial<PanSessionHandlers> = {}

  private removeListeners: Function = noop

  /**
   * Minimal pan distance required before recognizing the pan.
   * @default "3px"
   */
  private threshold = 3

  constructor(
    event: AnyPointerEvent,
    handlers: Partial<PanSessionHandlers>,
    threshold?: number,
  ) {
    // If we have more than one touch, don't start detecting this gesture
    if (isMultiTouchEvent(event)) return

    this.handlers = handlers

    if (threshold) {
      this.threshold = threshold
    }

    // stop default browser behavior
    event.stopPropagation()
    event.preventDefault()

    // get and save the `pointerdown` event info in history
    // we'll use it to compute the `offset`
    const info = extractEventInfo(event)
    this.history = [info.point]

    // notify pan session start
    const { onSessionStart } = handlers
    onSessionStart?.(event, getPanInfo(info, this.history))

    // attach event listeners and return a single function to remove them all
    this.removeListeners = pipe(
      addPointerEvent(window, "pointermove", this.onPointerMove),
      addPointerEvent(window, "pointerup", this.onPointerUp),
      addPointerEvent(window, "pointercancel", this.onPointerUp),
    )
  }

  private updatePoint = () => {
    if (!(this.lastEvent && this.lastEventInfo)) return

    const info = getPanInfo(this.lastEventInfo, this.history)

    const isPanStarted = this.startEvent !== null

    const isDistancePastThreshold =
      distance(info.offset, { x: 0, y: 0 }) >= this.threshold

    if (!isPanStarted && !isDistancePastThreshold) return

    this.history.push(info.point)

    const { onStart, onMove } = this.handlers

    if (!isPanStarted) {
      onStart?.(this.lastEvent, info)
      this.startEvent = this.lastEvent
    }

    onMove?.(this.lastEvent, info)
  }

  private onPointerMove = (event: AnyPointerEvent, info: PointerEventInfo) => {
    this.lastEvent = event
    this.lastEventInfo = info

    // Because Safari doesn't trigger mouseup events when it's above a `<select>`
    if (isMouseEvent(event) && event.buttons === 0) {
      this.onPointerUp(event, info)
      return
    }

    // Throttle mouse move event to once per frame
    sync.update(this.updatePoint, true)
  }

  private onPointerUp = (event: AnyPointerEvent, info: PointerEventInfo) => {
    this.end()

    const { onEnd } = this.handlers
    if (!onEnd || !this.startEvent) return

    const panInfo = getPanInfo(info, this.history)
    onEnd?.(event, panInfo)
  }

  updateHandlers(handlers: Partial<PanSessionHandlers>) {
    this.handlers = handlers
  }

  end() {
    this.removeListeners?.()
    cancelSync.update(this.updatePoint)
  }
}

function subtractPoint(a: Point, b: Point) {
  return { x: a.x - b.x, y: a.y - b.y }
}

function startPanPoint(history: Point[]) {
  return history[0]
}

function lastPanPoint(history: Point[]) {
  return history[history.length - 1]
}

function getPanInfo(info: PointerEventInfo, history: Point[]) {
  return {
    point: info.point,
    delta: subtractPoint(info.point, lastPanPoint(history)),
    offset: subtractPoint(info.point, startPanPoint(history)),
  }
}
