import * as React from "react";
import { canUseDOM, FunctionArguments } from "@chakra-ui/utils";

type AddEventLister = FunctionArguments<typeof document.addEventListener>;

export function useEventListener(
  event: keyof WindowEventMap,
  handler: (event: any) => void,
  environment: Document | null = canUseDOM ? document : null,
  options?: AddEventLister[2],
) {
  const savedHandler = React.useRef(handler);
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    if (environment == null) return;
    const eventListener = (event: any) => savedHandler.current(event);
    environment.addEventListener(event, eventListener, options);

    return () => {
      environment.removeEventListener(event, eventListener, options);
    };
  }, [event, environment, options]);
}

export default useEventListener;
