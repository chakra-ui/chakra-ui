import * as React from "react";
import { isTabbable, ensureFocus } from "@chakra-ui/utils";
import useUpdateEffect from "./useUpdateEffect";
import { FocusOptions } from "./useFocusOnShow";

function useFocusOnHide(
  ref: React.RefObject<HTMLElement>,
  options: FocusOptions,
) {
  const shouldFocus = options.autoFocus && !options.visible;

  useUpdateEffect(() => {
    if (!shouldFocus) return;
    const element = ref.current;

    // Hide was triggered by a click/focus on a tabbable element outside
    // the dialog or on another dialog. We won't change focus then.
    if (
      document.activeElement &&
      element &&
      !element.contains(document.activeElement) &&
      (isTabbable(document.activeElement) ||
        document.activeElement.getAttribute("data-dialog") === "true")
    ) {
      return;
    }

    const focusEl = options.focusRef && options.focusRef.current;

    if (focusEl) {
      ensureFocus(focusEl);
    }
  }, [ref, shouldFocus]);
}

export default useFocusOnHide;
