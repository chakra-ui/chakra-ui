import * as React from "react";
import { isTabbable, ensureFocus } from "@chakra-ui/utils";
import { UseFocusOnShowOptions } from "./useFocusOnShow";
import usePrevious from "./usePrevious";

function useFocusOnHide(
  ref: React.RefObject<HTMLElement>,
  options: UseFocusOnShowOptions,
) {
  const previouslyVisible = usePrevious(options.visible);

  React.useEffect(() => {
    const shouldFocus = options.autoFocus && !options.visible;
    if (!shouldFocus) return;

    const element = ref.current;

    // Hide was triggered by a click/focus on a tabbable element outside
    // the dialog or on another dialog. We won't change focus then.
    const preventFocus =
      document.activeElement &&
      element &&
      !element.contains(document.activeElement) &&
      (isTabbable(document.activeElement) ||
        document.activeElement.getAttribute("data-dialog") === "true");
    debugger;
    if (preventFocus) return;

    const focusEl = options.focusRef && options.focusRef.current;

    if (focusEl && previouslyVisible && !options.visible) {
      ensureFocus(focusEl);
    }
  }, [options.autoFocus, options.visible, ref, previouslyVisible]);
}

export default useFocusOnHide;
