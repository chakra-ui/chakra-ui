import * as React from "react";

function hasFocusWithin(
  ref: React.RefObject<HTMLElement>,
  event: React.FocusEvent,
) {
  if (!document.activeElement || !ref || !ref.current) return false;

  const hasFocus =
    ref.current &&
    ref.current.contains((event.relatedTarget ||
      document.activeElement) as HTMLElement);

  return hasFocus;
}

function useBlurOutside(
  buttonRef: React.RefObject<HTMLButtonElement>,
  containerRef: React.RefObject<HTMLElement>,
  options: {
    action: () => void;
    visible: boolean;
  },
) {
  React.useEffect(() => {
    // Fix firefox toggle issue
    const preventDefault = (event: MouseEvent) => {
      event.preventDefault();
    };
    if (buttonRef && buttonRef.current) {
      buttonRef.current.addEventListener("mousedown", preventDefault);
    }
    return () => {
      if (buttonRef && buttonRef.current) {
        buttonRef.current.removeEventListener("mousedown", preventDefault);
      }
    };
  }, []);

  return (event: React.FocusEvent) => {
    const shouldClose = options.visible && !hasFocusWithin(containerRef, event);

    if (shouldClose) {
      options.action();
    }
  };
}

export default useBlurOutside;
