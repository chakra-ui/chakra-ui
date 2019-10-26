import { useRef, useCallback } from "react";
import focusLock from "dom-focus-lock";

interface useFocusTrapOptions {
  /**
   * callback fired on activation
   */
  onActivate?: () => void;
  /**
   * callback fired on deactivation
   */
  onDeactivate?: () => void;
  /**
   * If `true`, will return focus to triggering element when it deactivates
   */
  shouldReturnFocus?: boolean;
  /**
   * If `true`, will defer focusing for a little while using `Promise.resolve`
   */
  allowDefer?: boolean;
}

function useFocusTrap({
  onActivate,
  onDeactivate,
  shouldReturnFocus,
  allowDefer,
}: useFocusTrapOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const originalFocusedElement = useRef<HTMLElement | null>(null);

  const returnFocus = useCallback(() => {
    const { current } = originalFocusedElement;
    if (shouldReturnFocus && current && current.focus) {
      originalFocusedElement.current = null;
      if (allowDefer) {
        Promise.resolve().then(() => current.focus());
      } else {
        current.focus();
      }
    }
  }, [shouldReturnFocus, allowDefer]);

  const deactivate = useCallback(() => {
    if (ref.current) {
      focusLock.off(ref.current);
    }

    if (shouldReturnFocus) {
      returnFocus();
    }

    if (onDeactivate) {
      onDeactivate();
    }
  }, [onDeactivate, shouldReturnFocus, returnFocus]);

  const activate = useCallback(() => {
    originalFocusedElement.current =
      originalFocusedElement.current ||
      (document && (document.activeElement as HTMLElement));

    if (ref.current) {
      focusLock.on(ref.current);
    }

    if (onActivate) {
      onActivate();
    }
  }, [onActivate]);

  return { deactivate, activate, ref };
}

export default useFocusTrap;
