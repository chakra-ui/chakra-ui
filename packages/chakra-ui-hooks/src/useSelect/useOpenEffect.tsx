import * as React from "react";
import { Selection } from "../useSelection";
import usePrevious from "../usePrevious";

function useOpenEffect(selection: Selection, isOpen: boolean) {
  const prevIsOpen = usePrevious(isOpen);

  React.useEffect(() => {
    if (prevIsOpen && !isOpen) {
      selection.reset("highlighted");
      return;
    }

    if (isOpen) {
      if (selection.selectedItem) {
        selection.highlight(selection.selectedItem);
      } else {
        if (!selection.highlightedItem) {
          selection.first("highlight");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, prevIsOpen]);
}

export default useOpenEffect;
