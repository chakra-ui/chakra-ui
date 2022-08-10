import { useEffect } from "react"
import { useCallbackRef } from "@chakra-ui/react-use-callback-ref"

export function useEventListener(
  target: EventTarget | null | (() => EventTarget | null),
  event: string,
  handler: (event: Event) => void,
  options?: boolean | AddEventListenerOptions,
) {
  const listener = useCallbackRef(handler)

  useEffect(() => {
    const node = typeof target === "function" ? target() : target ?? document

    if (!handler || !node) return

    node.addEventListener(event, listener, options)
    return () => {
      node.removeEventListener(event, listener, options)
    }
  }, [event, target, options, listener, handler])

  return () => {
    const node = typeof target === "function" ? target() : target ?? document
    node?.removeEventListener(event, listener, options)
  }
}
