import { addDomEvent } from "./add-dom-event"
import { isMouseEvent } from "./assertion"
import { getEventPoint } from "./get-event-point"
import { MixedEventListener } from "./types"

function filter(cb: EventListener): EventListener {
  return (event: Event) => {
    const isMouse = isMouseEvent(event)
    if (!isMouse || (isMouse && event.button === 0)) {
      cb(event)
    }
  }
}

function wrap(cb: MixedEventListener, filterPrimary = false): EventListener {
  function listener(event: any) {
    cb(event, { point: getEventPoint(event) })
  }
  const fn = filterPrimary ? filter(listener) : listener
  return fn as EventListener
}

export function addPointerEvent(
  target: EventTarget,
  type: string,
  cb: MixedEventListener,
  options?: AddEventListenerOptions,
) {
  return addDomEvent(target, type, wrap(cb, type === "pointerdown"), options)
}
