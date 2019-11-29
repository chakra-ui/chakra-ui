import * as React from "react";
import useLiveRef from "../useLiveRef";

type ElementRef = React.RefObject<HTMLElement>;
type Event = "click" | "focus";

function useClickOutside(
  ref: ElementRef,
  nested: ElementRef[],
  callback: Function,
  events: Event[] = ["click"],
) {
  const callbackRef = useLiveRef(callback);

  React.useEffect(() => {
    const handler = (event: any) => {
      if (!callbackRef.current) return;

      const container = ref.current;
      if (!container) return;
      if (container.contains(event.target as HTMLElement)) return;

      if (
        nested.find(dialog =>
          Boolean(
            dialog.current &&
              dialog.current.contains(event.target as HTMLElement),
          ),
        )
      ) {
        return;
      }
      callbackRef.current(event);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler);
      }
    };
  }, [events, nested, callbackRef, ref]);
}

export default useClickOutside;
