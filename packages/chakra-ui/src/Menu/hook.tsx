import * as React from "react";
import { isTabbable, ensureFocus } from "@chakra-ui/utils";
import { usePrevious } from "@chakra-ui/hooks";

function hasFocusWithin(
  ref: React.RefObject<HTMLElement>,
  event: React.FocusEvent,
) {
  const hasFocus =
    ref.current &&
    ref.current.contains((event.relatedTarget ||
      document.activeElement) as HTMLElement);

  return hasFocus;
}

export function useBlurOutside(
  buttonRef: React.RefObject<HTMLButtonElement>,
  containerRef: React.RefObject<HTMLElement>,
  options: {
    action: () => void;
    visible: boolean;
  },
) {
  React.useEffect(() => {
    // Fix firefox toggle issue
    const preventDefault = (event: MouseEvent) => event.preventDefault();
    if (buttonRef.current) {
      buttonRef.current.addEventListener("mousedown", preventDefault);
    }
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mousedown", preventDefault);
      }
    };
  }, [buttonRef]);

  return (event: React.FocusEvent) => {
    const shouldClose = options.visible && !hasFocusWithin(containerRef, event);
    if (shouldClose) {
      options.action();
    }
  };
}

export function useFocusOnHide(
  ref: React.RefObject<HTMLElement>,
  options: any,
) {
  const previouslyVisible = usePrevious(options.visible);

  React.useEffect(() => {
    const shouldFocus = options.autoFocus && !options.visible;
    if (!shouldFocus) return;

    // Hide was triggered by a click/focus on a tabbable element outside
    // the dialog or on another dialog. We won't change focus then.
    if (
      document.activeElement &&
      ref.current &&
      !ref.current.contains(document.activeElement) &&
      isTabbable(document.activeElement)
    ) {
      return;
    }

    const focusEl = options.focusRef && options.focusRef.current;

    console.log(document.activeElement);

    if (focusEl && previouslyVisible && shouldFocus) {
      // ensureFocus(focusEl);
    }
  }, [
    options.autoFocus,
    options.visible,
    ref,
    previouslyVisible,
    options.focusRef,
  ]);
}

export default useFocusOnHide;
