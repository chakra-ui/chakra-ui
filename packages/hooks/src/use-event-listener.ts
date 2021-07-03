import { runIfFn } from "@chakra-ui/utils"
import * as React from "react"
import { useCallbackRef } from "./use-callback-ref"

type DocumentOrElement = Document | HTMLElement | null

export type EventListenerEnv = (() => DocumentOrElement) | DocumentOrElement

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param doc the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 *
 * @internal
 */
export function useEventListener<K extends keyof DocumentEventMap>(
  event: K | (string & {}),
  handler: (event: DocumentEventMap[K]) => void,
  env?: EventListenerEnv,
  options?: boolean | AddEventListenerOptions,
) {
  const listener = useCallbackRef(handler) as EventListener

  React.useEffect(() => {
    const node = runIfFn(env) ?? document

    node.addEventListener(event, listener, options)
    return () => {
      node.removeEventListener(event, listener, options)
    }
  }, [event, env, options, listener])

  return () => {
    const node = runIfFn(env) ?? document
    node.removeEventListener(event, listener, options)
  }
}
