import * as React from "react"
import { isBrowser, isRefObject } from "@chakra-ui/utils"
import { useCallbackRef } from "./use-callback-ref"

export type EventListenerRef =
  | Document
  | HTMLElement
  | React.RefObject<HTMLElement>

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param doc the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 */
export function useEventListener<K extends keyof DocumentEventMap>(
  event: K | (string & {}),
  handler: (event: DocumentEventMap[K]) => void,
  env: EventListenerRef | null = isBrowser ? document : null,
  options?: boolean | AddEventListenerOptions,
) {
  const fn = useCallbackRef(handler) as any

  React.useEffect(() => {
    const node = isRefObject(env) ? env.current : env
    if (!env || !node) return

    const listener = (event: any) => {
      fn(event)
    }

    node.addEventListener(event, listener, options)
    return () => {
      node.removeEventListener(event, listener, options)
    }
  }, [event, env, options, fn])

  return () => {
    const node = isRefObject(env) ? env.current : env
    node?.removeEventListener(event, fn, options)
  }
}
