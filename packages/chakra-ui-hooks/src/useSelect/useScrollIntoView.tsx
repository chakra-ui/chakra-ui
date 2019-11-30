import * as React from "react";
import scrollIntoView from "scroll-into-view-if-needed";
import { SelectionItem, SelectionState } from "../useSelection/reducer";

function useScrollIntoView(
  listBoxRef: React.RefObject<any>,
  items: SelectionState["items"],
  highlightedItem: SelectionItem | null,
  visible: boolean,
) {
  React.useEffect(() => {
    if (visible) {
      if (!highlightedItem) return;

      if (highlightedItem && highlightedItem.ref && listBoxRef.current) {
        scrollIntoView(highlightedItem.ref.current, {
          boundary: listBoxRef.current,
          behavior: "instant",
          block: "nearest",
          scrollMode: "if-needed",
        });
      }
    }
  }, [visible, highlightedItem, items, listBoxRef]);
}

export default useScrollIntoView;
