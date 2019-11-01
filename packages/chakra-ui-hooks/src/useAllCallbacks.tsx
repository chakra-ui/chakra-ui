import * as React from "react";
import { AnyFunction } from "@chakra-ui/utils";

// https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/useAllCallbacks.ts
function useAllCallbacks(...callbacks: Array<AnyFunction | null | undefined>) {
  return React.useCallback((...args: any[]) => {
    const fns = callbacks.filter(Boolean) as Array<AnyFunction>;
    for (const callback of fns) callback(...args);
  }, callbacks);
}

export default useAllCallbacks;
