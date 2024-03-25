import { AnyPointerEvent, PointType } from "./event-types"
import { isTouchEvent } from "./is-event"

function pointFromTouch(e: TouchEvent, type: PointType = "page") {
  const point = e.touches[0] || e.changedTouches[0]
  return { x: point[`${type}X`], y: point[`${type}Y`] }
}

function pointFromMouse(
  point: MouseEvent | PointerEvent,
  type: PointType = "page",
) {
  return {
    x: point[`${type}X`],
    y: point[`${type}Y`],
  }
}

export function getEventPoint(
  event: AnyPointerEvent,
  type: PointType = "page",
) {
  return isTouchEvent(event)
    ? pointFromTouch(event, type)
    : pointFromMouse(event, type)
}
