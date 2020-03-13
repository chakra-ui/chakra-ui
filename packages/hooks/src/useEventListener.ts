import * as React from "react"
import { isBrowser, FunctionArguments } from "@chakra-ui/utils"
import useLatestRef from "./useLatestRef"

type AddEventLister = FunctionArguments<typeof document.addEventListener>

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

export default useEventListener
