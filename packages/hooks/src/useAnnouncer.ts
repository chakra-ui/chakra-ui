import * as React from "react";
import { visuallyHiddenStyle } from "@chakra-ui/utils";

export const getId = (uniqueId: string): string =>
  `__chakra-announcer-${uniqueId}`;

export function useAnnouncer(uniqueId: string) {
  const id: string = React.useMemo(() => getId(uniqueId), [uniqueId]);
  const ref = React.useRef<HTMLElement>(
    null,
  ) as React.MutableRefObject<HTMLElement | null>;

  React.useEffect(() => {
    const node: HTMLElement = document.createElement("div");
    // storing reference for usage in announce
    ref.current = node;

    // identifier
    node.id = id;

    // Aria live region

    // will force itself to be read
    node.setAttribute("aria-live", "assertive");
    node.setAttribute("role", "log");

    // must read the whole thing every time
    node.setAttribute("aria-atomic", "true");

    // hide the element visually
    Object.assign(node.style, visuallyHiddenStyle);

    // Add to body
    document.body.appendChild(node);

    return () => {
      // unmounting after a timeout to let any announcements
      // during a mount be published
      setTimeout(() => {
        // not clearing the ref as it might have been set by a new effect
        document.body.removeChild(node);

        // if node was the current ref - clear it so that
        // we can get a warning if announce is called
        if (node === ref.current) {
          ref.current = null;
        }
      }, 0);
    };
  }, [id, ref]);

  const announce = React.useCallback(
    (message: string): void => {
      const node = ref.current as HTMLElement;
      if (node) {
        node.textContent = message;
        return;
      }
    },
    [ref],
  );

  return announce;
}

export default useAnnouncer;
