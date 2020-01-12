import * as React from "react";
import { canUseDOM } from "@chakra-ui/utils";

export function useEventListener(
  event: keyof WindowEventMap,
  handler: (event: any) => void,
  environment: Document | null = canUseDOM ? document : null,
) {
  const savedHandler = React.useRef(handler);
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    if (environment == null) return;
    const eventListener = (event: any) => savedHandler.current(event);
    environment.addEventListener(event, eventListener, true);

    return () => {
      environment.removeEventListener(event, eventListener, true);
    };
  }, [event, environment]);
}

export default useEventListener;
