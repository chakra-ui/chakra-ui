import * as React from "react";

export function useEventListenerOutside(
  containerRef: React.RefObject<HTMLElement>,
  event: string,
  handler?: (e: Event) => void,
  shouldListen?: boolean,
) {
  const handlerRef = React.useRef(handler);

  React.useEffect(() => {
    if (!shouldListen) return undefined;

    const handleEvent = (e: MouseEvent) => {
      if (!handlerRef.current) return;

      const container = containerRef.current;
      const target = e.target as Element;

      if (!container) {
        return;
      }

      // Click inside dialog
      if (container.contains(target)) return;

      handlerRef.current(e);
    };

    document.addEventListener(event as any, handleEvent, true);

    return () => {
      document.removeEventListener(event as any, handleEvent, true);
    };
  }, [containerRef, event, handlerRef, shouldListen]);
}

export function useOnClickOutside(
  boundaryRef: React.RefObject<HTMLElement>,
  options: { hide: () => void; visible: boolean; hideOnClickOutside: boolean },
) {
  const useEvent = (eventType: string) =>
    useEventListenerOutside(
      boundaryRef,
      eventType,
      options.hide,
      options.visible && options.hideOnClickOutside,
    );
  useEvent("click");
  useEvent("focus");
}
