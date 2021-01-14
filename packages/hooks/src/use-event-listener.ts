import * as React from "react"
import { isBrowser } from "@chakra-ui/utils"
import { useCallbackRef } from "./use-callback-ref"

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param doc the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 */
export function useEventListener<K extends keyof DocumentEventMap>(
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  env: Document | HTMLElement | null = isBrowser ? document : null,
  options?: boolean | AddEventListenerOptions,
) {
  const fn = useCallbackRef(handler) as any

  React.useEffect(() => {
    if (!env) return undefined

    const listener = (event: any) => {
      fn(event)
    }

    env.addEventListener(event, listener, options)
    return () => {
      env.removeEventListener(event, listener, options)
    }
  }, [event, env, options, fn])

  return () => {
    env?.removeEventListener(event, fn, options)
  }
}
