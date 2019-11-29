import React, { useRef } from "react";
import useLiveRef from "../useLiveRef";

const defaultEvents = ["mousedown", "touchstart"];

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  // disclosuresRef: React.RefObject<HTMLElement[]>,
  nestedDialogs: Array<React.RefObject<HTMLElement>>,
  onClickAway: (event: KeyboardEvent) => void,
  events: string[] = defaultEvents,
) {
  const savedCallback = useLiveRef(onClickAway);

  React.useEffect(() => {
    const handler = (event: any) => {
      if (!savedCallback.current) return;

      const container = ref.current;
      // const disclosures = disclosuresRef.current || [];

      if (!container) return;
      if (container.contains(event.target)) return;

      // Click on disclosure
      // if (
      //   disclosures.length &&
      //   disclosures.some(disclosure => disclosure.contains(event.target))
      // ) {
      //   return;
      // }

      // if (
      //   nestedDialogs.find(dialog =>
      //     Boolean(dialog.current && dialog.current.contains(event.target)),
      //   )
      // ) {
      //   return;
      // }

      savedCallback.current(event);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler);
      }
    };
  }, [events, ref]);
}

export default useClickOutside;
