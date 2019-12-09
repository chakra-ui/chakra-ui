import * as AriaHidden from "aria-hidden";
import * as React from "react";

function useAriaHidden(
  ref: React.RefObject<HTMLElement>,
  shouldActivate: boolean,
) {
  React.useEffect(() => {
    if (!ref.current) return;

    let undoAriaHidden: AriaHidden.Undo | null = null;
    let elementNode = ref.current;

    if (shouldActivate && elementNode) {
      undoAriaHidden = AriaHidden.hideOthers(elementNode);
    }

    return () => {
      if (shouldActivate && undoAriaHidden != null) {
        undoAriaHidden();
      }
    };
  }, [shouldActivate, ref]);
}

export default useAriaHidden;
