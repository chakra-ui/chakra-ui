import {
  addPointerEvent,
  getEventPoint,
  isMultiTouchEvent,
} from "@chakra-ui/utils"
import sync, { cancelSync, getFrameData } from "framesync"
import {
  AnyPointerEvent,
  PanEventHandlers,
  PanEventHistory,
  Point,
  PointerEventInfo,
  TimestampedPoint,
} from "./types"

/**
 * A Pan Session is recognized when the pointer is down
 * and moved in the allowed direction.
 */
export class PanEvent {
  /**
   * We use this to keep track of the `x` and `y` pan session history
   * as the pan event happens. It helps to calculate the `offset` and `delta`
   */
  private history: PanEventHistory = []

  // The pointer event that started the pan session
  private startEvent: AnyPointerEvent | null = null

  // The current pointer event for the pan session
  private lastEvent: AnyPointerEvent | null = null

  // The current pointer event info for the pan session
  private lastEventInfo: PointerEventInfo | null = null

  private handlers: Partial<PanEventHandlers> = {}

  private removeListeners: Function = () => {}

  /**
   * Minimal pan distance required before recognizing the pan.
   * @default "3px"
   */
  private threshold = 3

  private win: typeof globalThis

  constructor(
    event: AnyPointerEvent,
    handlers: Partial<PanEventHandlers>,
    threshold?: number,
  ) {
    this.win = (event.view ?? window) as typeof globalThis.window

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
    const info = { point: getEventPoint(event) }
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

  updateHandlers(handlers: Partial<PanEventHandlers>) {
    this.handlers = handlers
  }

  end() {
    this.removeListeners?.()
    cancelSync.update(this.updatePoint)
  }
}

/* -----------------------------------------------------------------------------
 * Utilities
 * -----------------------------------------------------------------------------*/

function subtract(a: Point, b: Point) {
  return { x: a.x - b.x, y: a.y - b.y }
}

function getPanInfo(info: PointerEventInfo, history: PanEventHistory) {
  return {
    point: info.point,
    delta: subtract(info.point, history[history.length - 1]),
    offset: subtract(info.point, history[0]),
    velocity: getVelocity(history, 0.1),
  }
}

const toMilliseconds = (v: number) => v * 1000

function getVelocity(history: TimestampedPoint[], timeDelta: number): Point {
  if (history.length < 2) {
    return { x: 0, y: 0 }
  }

  let i = history.length - 1
  let timestampedPoint: TimestampedPoint | null = null
  const lastPoint = history[history.length - 1]
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

function pipe<R>(...fns: Array<(a: R) => R>) {
  return (v: R) => fns.reduce((a, b) => b(a), v)
}

function distance1D(a: number, b: number) {
  return Math.abs(a - b)
}

function isPoint(point: any): point is { x: number; y: number } {
  return "x" in point && "y" in point
}

export function distance<P extends Point | number>(a: P, b: P) {
  if (typeof a === "number" && typeof b === "number") {
    return distance1D(a, b)
  }

  if (isPoint(a) && isPoint(b)) {
    const xDelta = distance1D(a.x, b.x)
    const yDelta = distance1D(a.y, b.y)
    return Math.sqrt(xDelta ** 2 + yDelta ** 2)
  }

  return 0
}
