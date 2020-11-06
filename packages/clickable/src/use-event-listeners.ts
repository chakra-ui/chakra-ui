import * as React from "react"

interface EventListeners {
  add<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  add(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void
  remove<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void
  remove(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void
}

export function useEventListeners(): EventListeners {
  const listeners = React.useRef(new Map())

  const add = React.useCallback((el, type, listener, options) => {
    listeners.current.set(listener, { type, el, options })
    el.addEventListener(type, listener, options)
  }, [])

  const remove = React.useCallback((el, type, listener, options) => {
    el.removeEventListener(type, listener, options)
    listeners.current.delete(listener)
  }, [])

  React.useEffect(() => {
    return () => {
      listeners.current.forEach((value, key) => {
        remove(value.el, value.type, key, value.options)
      })
    }
  }, [remove])

  return { add, remove }
}
