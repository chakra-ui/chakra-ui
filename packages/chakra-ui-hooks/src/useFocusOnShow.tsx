import { getFirstTabbableIn, ensureFocus } from "@chakra-ui/utils";
import * as React from "react";

export interface UseFocusOnShowOptions {
  autoFocus?: boolean;
  visible?: boolean;
  focusRef?: React.RefObject<HTMLElement>;
}

function useFocusOnShow(
  ref: React.RefObject<HTMLElement>,
  options: UseFocusOnShowOptions,
) {
  React.useEffect(() => {
    const initialFocusRef = options.focusRef;
    const shouldFocus = options.visible && options.autoFocus;

    if (shouldFocus) {
      if (initialFocusRef && initialFocusRef.current) {
        ensureFocus(initialFocusRef.current);
      } else {
        if (ref.current) {
          const firstTabbable = getFirstTabbableIn(ref.current, true);
          if (firstTabbable) {
            ensureFocus(firstTabbable);
          } else {
            ensureFocus(ref.current);
          }
        }
      }
    }
  }, [options.visible, options.autoFocus, ref, options.focusRef]);
}

export default useFocusOnShow;
