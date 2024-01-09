import { useCallback, useEffect, useRef } from "react"

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
  const listeners = useRef(new Map())
  const currentListeners = listeners.current

  const add = useCallback((el: any, type: any, listener: any, options: any) => {
    listeners.current.set(listener, { type, el, options })
    el.addEventListener(type, listener, options)
  }, [])

  const remove = useCallback(
    (el: any, type: any, listener: any, options: any) => {
      el.removeEventListener(type, listener, options)
      listeners.current.delete(listener)
    },
    [],
  )

  useEffect(
    () => () => {
      currentListeners.forEach((value, key) => {
        remove(value.el, value.type, key, value.options)
      })
    },
    [remove, currentListeners],
  )

  return { add, remove }
}
