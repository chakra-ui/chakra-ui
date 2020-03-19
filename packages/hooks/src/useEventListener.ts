import * as React from "react"
import { isBrowser, FunctionArguments } from "@chakra-ui/utils"
import { useLatestRef } from "./useLatestRef"

type AddEventLister = FunctionArguments<typeof document.addEventListener>

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param environment the dom environment to execurte against (defaults to `document`)
 * @param options the event listener options
 */
export function useEventListener(
  event: keyof WindowEventMap,
  handler: (event: any) => void,
  environment: Document | null = isBrowser ? document : null,
  options?: AddEventLister[2],
) {
  const savedHandler = useLatestRef(handler)

  React.useEffect(() => {
    if (environment == null) return
    const eventListener = (event: any) => savedHandler.current(event)
    environment.addEventListener(event, eventListener, options)

    return () => {
      environment.removeEventListener(event, eventListener, options)
    }
  }, [event, environment, options, savedHandler])
}
