import {
  PointerEventInfo,
  getPointerEventName,
  wrapPointerEventHandler,
  EventListenerWithPointInfo,
} from "@chakra-ui/utils"
import * as React from "react"

interface EventListeners {
  add<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    listener: (ev: DocumentEventMap[K], info: PointerEventInfo) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  add(
    el: EventTarget,
    type: string,
    listener: EventListenerWithPointInfo,
    options?: boolean | AddEventListenerOptions,
  ): void
  remove<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    listener: (ev: DocumentEventMap[K], info: PointerEventInfo) => any,
    options?: boolean | EventListenerOptions,
  ): void
  remove(
    el: EventTarget,
    type: string,
    listener: EventListenerWithPointInfo,
    options?: boolean | EventListenerOptions,
  ): void
}

export function useEventListenerMap(): EventListeners {
  const listeners = React.useRef(new Map())
  const currentListeners = listeners.current

  const add = React.useCallback((el, type, listener, options) => {
    const pointerEventListener = wrapPointerEventHandler(
      listener,
      type === "pointerdown",
    )
    listeners.current.set(listener, {
      __listener: pointerEventListener,
      type: getPointerEventName(type),
      el,
      options,
    })
    el.addEventListener(type, pointerEventListener, options)
  }, [])

  const remove = React.useCallback((el, type, listener, options) => {
    const { __listener: pointerEventListener } = listeners.current.get(listener)
    el.removeEventListener(type, pointerEventListener, options)
    listeners.current.delete(pointerEventListener)
  }, [])

  React.useEffect(
    () => () => {
      currentListeners.forEach((value, key) => {
        remove(value.el, value.type, key, value.options)
      })
    },
    [remove, currentListeners],
  )

  return { add, remove }
}
