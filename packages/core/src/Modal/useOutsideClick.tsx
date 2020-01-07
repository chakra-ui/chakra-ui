import * as React from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  dialogs: React.RefObject<HTMLElement>[],
  callback: (event: MouseEvent) => void,
) {
  React.useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current) return;

      const self = event.target as HTMLElement;

      const isContained = ref.current.contains(self);
      const lastDialog = dialogs[dialogs.length - 1];

      if (!isContained && lastDialog.current === ref.current) {
        callback && callback(event);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dialogs, callback, ref]);
}

export default useOutsideClick;
