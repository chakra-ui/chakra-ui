import * as React from "react";
import { SelectionAction, SelectionState } from "../useSelection/reducer";

function useOpenEffect(
  state: SelectionState,
  dispatch: React.Dispatch<SelectionAction>,
  isOpen: boolean,
  prevIsOpen: boolean,
) {
  React.useLayoutEffect(() => {
    if (prevIsOpen && !isOpen) {
      return dispatch({ type: "RESET", action: "highlighted" });
    }

    if (isOpen) {
      if (state.selectedItem) {
        dispatch({ type: "HIGHLIGHT", item: state.selectedItem });
      } else {
        if (!state.highlightedItem) {
          dispatch({ type: "FIRST", action: "highlight" });
        }
      }
    }
    // eslint-disable-next-line
  }, [isOpen, prevIsOpen]);
}

export default useOpenEffect;
