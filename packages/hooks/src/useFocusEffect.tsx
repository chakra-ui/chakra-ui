import * as React from "react";
import { hasFocusWithin, ensureFocus } from "@chakra-ui/utils";
import useUpdateEffect from "./useUpdateEffect";

export function useFocusEffect<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: { shouldFocus: boolean; preventScroll?: boolean },
) {
  const { shouldFocus, preventScroll } = options;

  useUpdateEffect(() => {
    if (!ref.current) return;
    if (shouldFocus && ref.current && !hasFocusWithin(ref.current)) {
      ensureFocus(ref.current, { preventScroll });
    }
  }, [shouldFocus, ref]);
}

export default useFocusEffect;
