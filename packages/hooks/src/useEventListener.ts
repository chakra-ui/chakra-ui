import * as React from "react"
import { isBrowser, FunctionArguments } from "@chakra-ui/utils"
import { useLatestRef } from "./useLatestRef"

type AddEventListener = FunctionArguments<typeof document.addEventListener>

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param doc the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 */
export function useEventListener(
  event: keyof WindowEventMap,
  handler: (event: any) => void,
  doc: Document | null = isBrowser ? document : null,
  options?: AddEventListener[2],
) {
  const savedHandler = useLatestRef(handler)

  React.useEffect(() => {
    if (!doc) return

    const listener = (event: any) => {
      savedHandler.current(event)
    }

    doc.addEventListener(event, listener, options)

    return () => {
      doc.removeEventListener(event, listener, options)
    }
  }, [event, doc, options, savedHandler])
}
