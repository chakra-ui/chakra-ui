import * as React from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface Options {
  isEnabled?: boolean;
  preserveScrollBarGap?: boolean;
}

function useLockBodyScroll({ isEnabled, preserveScrollBarGap }: Options) {
  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    const dialogNode = ref.current;
    if (isEnabled && dialogNode) {
      disableBodyScroll(dialogNode, {
        reserveScrollBarGap: preserveScrollBarGap,
      });
    }
    return () => {
      if (dialogNode) {
        enableBodyScroll(dialogNode);
      }
    };
  }, [isEnabled, preserveScrollBarGap]);

  return ref;
}

export default useLockBodyScroll;
