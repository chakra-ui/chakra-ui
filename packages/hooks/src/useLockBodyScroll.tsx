import * as React from "react";
import * as Lock from "body-scroll-lock";

export interface LockBodyScrollOptions {
  shouldLock?: boolean;
  preserveScrollBarGap?: boolean;
  allowTouchMove?: Lock.BodyScrollOptions["allowTouchMove"];
}

export function useLockBodyScroll(
  ref: React.RefObject<HTMLElement>,
  options: LockBodyScrollOptions,
) {
  React.useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    if (options.shouldLock && node) {
      Lock.disableBodyScroll(node, {
        reserveScrollBarGap: options.preserveScrollBarGap,
        allowTouchMove: options.allowTouchMove,
      });
    }
    return () => {
      if (node) Lock.enableBodyScroll(node);
    };
  }, [
    ref,
    options.shouldLock,
    options.allowTouchMove,
    options.preserveScrollBarGap,
  ]);
}

export default useLockBodyScroll;
