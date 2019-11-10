import * as React from "react";
import { isTabbable, ensureFocus } from "@chakra-ui/utils";

export function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: ReadonlyArray<any> | undefined,
) {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (mounted.current) {
      return effect();
    }
    mounted.current = true;
    return undefined;
  }, deps);
}

interface FocusOptions {
  autoFocus?: boolean;
  visible?: boolean;
  focusRef: React.RefObject<HTMLElement>;
}

export function useFocusOnHide(
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

export function useFocusOnShow(
  ref: React.RefObject<HTMLElement>,
  options: FocusOptions,
) {
  const initialFocusRef = options.focusRef;
  const shouldFocus = options.visible && options.autoFocus;

  useUpdateEffect(() => {
    const element = ref.current;

    // If there're nested open dialogs, let them handle focus
    if (!shouldFocus || !element) {
      return;
    }

    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus({ preventScroll: true });
    } else {
      const tabbable = getFirstTabbableIn(element, true);
      const isActive = () => element.contains(document.activeElement);
      if (tabbable) {
        ensureFocus(tabbable, { preventScroll: true, isActive });
      } else {
        ensureFocus(element, { preventScroll: true, isActive });
      }
    }
  }, [ref, initialFocusRef, shouldFocus]);
}
