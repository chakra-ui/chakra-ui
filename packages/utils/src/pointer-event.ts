/**
 * Credit goes to `framer-motion` of this useful utilities.
 * License can be found here: https://github.com/framer/motion
 */

import { addDomEvent, getEventWindow, isBrowser } from "./dom"

export type AnyPointerEvent = MouseEvent | TouchEvent | PointerEvent

type PointType = "page" | "client"

export function isMouseEvent(event: AnyPointerEvent): event is MouseEvent {
  const win = getEventWindow(event)

  // PointerEvent inherits from MouseEvent so we can't use a straight instanceof check.
  if (
    typeof win.PointerEvent !== "undefined" &&
    event instanceof win.PointerEvent
  ) {
    return !!(event.pointerType === "mouse")
  }

  return event instanceof win.MouseEvent
}

export function isTouchEvent(event: AnyPointerEvent): event is TouchEvent {
  const hasTouches = !!(event as TouchEvent).touches
  return hasTouches
}

export interface Point {
  x: number
  y: number
}

export interface PointerEventInfo {
  point: Point
}

export type EventHandler = (
  event: AnyPointerEvent,
  info: PointerEventInfo,
) => void

/**
 * Filters out events not attached to the primary pointer (currently left mouse button)
 * @param eventHandler
 */
function filterPrimaryPointer(eventHandler: EventListener): EventListener {
  return (event: Event) => {
    const win = getEventWindow(event)
    const isMouseEvent = event instanceof win.MouseEvent
    const isPrimaryPointer =
      !isMouseEvent || (isMouseEvent && (event as MouseEvent).button === 0)
    if (isPrimaryPointer) {
      eventHandler(event)
    }
  }
}

export type EventListenerWithPointInfo = (
  e: AnyPointerEvent,
  info: PointerEventInfo,
) => void

const defaultPagePoint = { pageX: 0, pageY: 0 }

function pointFromTouch(e: TouchEvent, pointType: PointType = "page") {
  const primaryTouch = e.touches[0] || e.changedTouches[0]
  const point = primaryTouch || defaultPagePoint

  return {
    x: point[`${pointType}X`],
    y: point[`${pointType}Y`],
  }
}

function pointFromMouse(
  point: MouseEvent | PointerEvent,
  pointType: PointType = "page",
) {
  return {
    x: point[`${pointType}X`],
    y: point[`${pointType}Y`],
  }
}

export function extractEventInfo(
  event: AnyPointerEvent,
  pointType: PointType = "page",
): PointerEventInfo {
  return {
    point: isTouchEvent(event)
      ? pointFromTouch(event, pointType)
      : pointFromMouse(event, pointType),
  }
}

export function getViewportPointFromEvent(event: AnyPointerEvent) {
  return extractEventInfo(event, "client")
}

export const wrapPointerEventHandler = (
  handler: EventListenerWithPointInfo,
  shouldFilterPrimaryPointer = false,
): EventListener => {
  const listener: EventListener = (event: any) =>
    handler(event, extractEventInfo(event))

  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener
}

// We check for event support via functions in case they've been mocked by a testing suite.
const supportsPointerEvents = () => isBrowser && window.onpointerdown === null
const supportsTouchEvents = () => isBrowser && window.ontouchstart === null
const supportsMouseEvents = () => isBrowser && window.onmousedown === null

interface PointerNameMap {
  pointerdown: string
  pointermove: string
  pointerup: string
  pointercancel: string
  pointerover?: string
  pointerout?: string
  pointerenter?: string
  pointerleave?: string
}

const mouseEventNames: PointerNameMap = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave",
}

const touchEventNames: PointerNameMap = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel",
}

export function getPointerEventName(name: string): string {
  if (supportsPointerEvents()) {
    return name
  }
  if (supportsTouchEvents()) {
    return touchEventNames[name]
  }
  if (supportsMouseEvents()) {
    return mouseEventNames[name]
  }

  return name
}

export function addPointerEvent(
  target: EventTarget,
  eventName: string,
  handler: EventListenerWithPointInfo,
  options?: AddEventListenerOptions,
) {
  return addDomEvent(
    target,
    getPointerEventName(eventName),
    wrapPointerEventHandler(handler, eventName === "pointerdown"),
    options,
  )
}

export function isMultiTouchEvent(event: AnyPointerEvent) {
  return isTouchEvent(event) && event.touches.length > 1
}
