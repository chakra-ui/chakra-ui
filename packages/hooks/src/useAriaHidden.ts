import * as AriaHidden from "aria-hidden";
import * as React from "react";

export function useAriaHidden(
  ref: React.RefObject<HTMLElement>,
  activate: boolean,
) {
  React.useEffect(() => {
    if (!ref.current) return;

    let undoAriaHidden: AriaHidden.Undo | null = null;
    const elementNode = ref.current;

    if (activate && elementNode) {
      undoAriaHidden = AriaHidden.hideOthers(elementNode);
    }

    return () => {
      if (activate && undoAriaHidden) undoAriaHidden();
    };
  }, [activate, ref]);
}

export default useAriaHidden;
