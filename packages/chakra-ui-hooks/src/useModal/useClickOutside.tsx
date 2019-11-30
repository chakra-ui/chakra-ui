import * as React from "react";

type ElementRef = React.RefObject<HTMLElement>;

function useClickOutside(
  ref: ElementRef,
  dialogs: ElementRef[],
  callback: Function,
) {
  React.useEffect(() => {
    const handler = (event: any) => {
      if (!ref.current) return;

      const isContained = ref.current.contains(event.target);
      const lastDialog = dialogs[dialogs.length - 1];

      if (!isContained && lastDialog.current === ref.current) {
        callback(event);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dialogs, callback, ref]);
}

export default useClickOutside;
