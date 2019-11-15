import { getFirstTabbableIn } from "@chakra-ui/utils";
import { useEffect } from "react";

export interface FocusOptions {
  autoFocus?: boolean;
  visible?: boolean;
  focusRef?: React.RefObject<HTMLElement>;
}

function useFocusOnShow(
  ref: React.RefObject<HTMLElement>,
  options: FocusOptions,
) {
  useEffect(() => {
    const initialFocusRef = options.focusRef;
    const shouldFocus = options.visible && options.autoFocus;

    if (shouldFocus) {
      requestAnimationFrame(() => {
        if (initialFocusRef && initialFocusRef.current) {
          initialFocusRef.current.focus({ preventScroll: true });
        } else {
          if (ref.current) {
            const firstTabbable = getFirstTabbableIn(ref.current, true);
            if (firstTabbable) {
              firstTabbable.focus({ preventScroll: true });
            } else {
              ref.current.focus({ preventScroll: true });
            }
          }
        }
      });
    }
  }, [options.visible, options.autoFocus, ref, options.focusRef]);
}

export default useFocusOnShow;
