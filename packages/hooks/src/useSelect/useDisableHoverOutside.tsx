import * as React from "react";
import { canUseDOM } from "@chakra-ui/utils";

type EventType =
  | "click"
  | "mouseover"
  | "mouseleave"
  | "focus"
  | "mouseenter"
  | "mousemove"
  | "mouseout";

export function useEventListener(
  events: EventType[] = [],
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

    for (const eventType of events) {
      environment.addEventListener(eventType, eventListener, true);
    }

    return () => {
      for (const eventType of events) {
        environment.removeEventListener(eventType, eventListener, true);
      }
    };
  }, [events, environment]);
}

function useDisableHoverOutside(
  menuRef: React.RefObject<any>,
  isOpen: boolean,
) {
  useEventListener(["mouseover", "mouseout"], (event: React.MouseEvent) => {
    if (!menuRef.current || !isOpen) return;
    console.log(event.currentTarget);
  });
}

export default useDisableHoverOutside;
