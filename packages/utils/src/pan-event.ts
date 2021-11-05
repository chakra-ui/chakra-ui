/**
 * This is a modified version of `PanSession` from `framer-motion`.
 *
 * Credit goes to `framer-motion` of this useful utilities.
 * License can be found here: https://github.com/framer/motion
 */

import sync, { cancelSync, getFrameData } from "framesync"
import { getEventWindow } from "./dom"
import { distance, noop, pipe } from "./function"
import {
  addPointerEvent,
  AnyPointerEvent,
  extractEventInfo,
  isMouseEvent,
  isMultiTouchEvent,
  Point,
  PointerEventInfo,
} from "./pointer-event"

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
  /**
   * Contains `x` and `y` values for the current velocity of the pointer.
   */
  velocity: Point
}

export type PanEventHandler = (
  event: AnyPointerEvent,
  info: PanEventInfo,
) => void

interface TimestampedPoint extends Point {
  timestamp: number
}

export interface PanSessionHandlers {
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
   * Callback fired when the current pan session has end.
   * This is typically called once `pointerup` event is fired.
   */
  onEnd: PanEventHandler
}

type PanSessionHistory = TimestampedPoint[]

export type PanSessionOptions = {
  threshold?: number
  window?: Window
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
  private history: PanSessionHistory = []

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

  private win: typeof globalThis

  constructor(
    event: AnyPointerEvent,
    handlers: Partial<PanSessionHandlers>,
    threshold?: number,
  ) {
    this.win = getEventWindow(event)

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
    const { timestamp } = getFrameData()
    this.history = [{ ...info.point, timestamp }]

    // notify pan session start
    const { onSessionStart } = handlers
    onSessionStart?.(event, getPanInfo(info, this.history))

    // attach event listeners and return a single function to remove them all
    this.removeListeners = pipe(
      addPointerEvent(this.win, "pointermove", this.onPointerMove),
      addPointerEvent(this.win, "pointerup", this.onPointerUp),
      addPointerEvent(this.win, "pointercancel", this.onPointerUp),
    )
  }

  private updatePoint = () => {
    if (!(this.lastEvent && this.lastEventInfo)) return

    const info = getPanInfo(this.lastEventInfo, this.history)

    const isPanStarted = this.startEvent !== null

    const isDistancePastThreshold =
      distance(info.offset, { x: 0, y: 0 }) >= this.threshold

    if (!isPanStarted && !isDistancePastThreshold) return

    const { timestamp } = getFrameData()
    this.history.push({ ...info.point, timestamp })

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
    // notify pan session ended
    const panInfo = getPanInfo(info, this.history)
    const { onEnd, onSessionEnd } = this.handlers

    onSessionEnd?.(event, panInfo)
    this.end()

    // if panning never started, no need to call `onEnd`
    // panning requires a pointermove of at least 3px
    if (!onEnd || !this.startEvent) return

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

function startPanPoint(history: PanSessionHistory) {
  return history[0]
}

function lastPanPoint(history: PanSessionHistory) {
  return history[history.length - 1]
}

function getPanInfo(info: PointerEventInfo, history: PanSessionHistory) {
  return {
    point: info.point,
    delta: subtractPoint(info.point, lastPanPoint(history)),
    offset: subtractPoint(info.point, startPanPoint(history)),
    velocity: getVelocity(history, 0.1),
  }
}

function lastDevicePoint(history: TimestampedPoint[]): TimestampedPoint {
  return history[history.length - 1]
}

const toMilliseconds = (seconds: number) => seconds * 1000

function getVelocity(history: TimestampedPoint[], timeDelta: number): Point {
  if (history.length < 2) {
    return { x: 0, y: 0 }
  }

  let i = history.length - 1
  let timestampedPoint: TimestampedPoint | null = null
  const lastPoint = lastDevicePoint(history)
  while (i >= 0) {
    timestampedPoint = history[i]
    if (
      lastPoint.timestamp - timestampedPoint.timestamp >
      toMilliseconds(timeDelta)
    ) {
      break
    }
    i--
  }

  if (!timestampedPoint) {
    return { x: 0, y: 0 }
  }

  const time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000
  if (time === 0) {
    return { x: 0, y: 0 }
  }

  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time,
  }

  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0
  }

  return currentVelocity
}
