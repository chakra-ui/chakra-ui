import { ensureFocus, isTabbable } from "@chakra-ui/utils";
import * as React from "react";
import { FocusOnShowHookOptions } from "./useFocusOnShow";
import useUpdateEffect from "./useUpdateEffect";

export function useFocusOnHide(
  ref: React.RefObject<HTMLElement>,
  options: FocusOnShowHookOptions,
) {
  const { focusRef, autoFocus, visible } = options;
  const shouldFocus = autoFocus && !visible;

  useUpdateEffect(() => {
    const element = ref.current;
    if (!shouldFocus || !element) return undefined;

    const preventFocus =
      document.activeElement &&
      element &&
      !element.contains(document.activeElement) &&
      isTabbable(document.activeElement);

    if (preventFocus) return;

    const focusEl = focusRef?.current;

    if (focusEl && !visible) ensureFocus(focusEl);
  }, [autoFocus, focusRef, visible, ref]);
}

export default useFocusOnHide;
