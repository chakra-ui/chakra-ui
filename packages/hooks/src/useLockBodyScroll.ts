import * as React from "react";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";

export function useLockBodyScroll(
  ref: React.RefObject<HTMLElement>,
  shouldLock?: boolean,
) {
  React.useEffect(() => {
    const element = ref.current;
    if (!element || !shouldLock) return undefined;
    disableBodyScroll(element, { reserveScrollBarGap: true });
    return () => enableBodyScroll(element);
  }, [ref, shouldLock]);
}

export default useLockBodyScroll;
