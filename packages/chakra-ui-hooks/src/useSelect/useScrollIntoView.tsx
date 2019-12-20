import computeScrollIntoView from "compute-scroll-into-view";
import * as React from "react";
import { Descendant } from "../useDescendant/reducer";

function scrollIntoView(node: HTMLElement, menuNode: HTMLElement) {
  if (node === null) {
    return;
  }

  const actions = computeScrollIntoView(node, {
    boundary: menuNode,
    block: "nearest",
    scrollMode: "if-needed",
  });
  actions.forEach(({ el, top, left }) => {
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}

function useScrollIntoView(
  menuRef: React.RefObject<any>,
  highlightedItem: Descendant | null,
  isOpen: boolean,
  shouldScrollRef: React.MutableRefObject<boolean>,
) {
  React.useEffect(() => {
    if (!highlightedItem || !isOpen) {
      return;
    }
    if (shouldScrollRef.current === false) {
      shouldScrollRef.current = true;
    } else {
      scrollIntoView(highlightedItem.ref.current, menuRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedItem, isOpen]);
}

export default useScrollIntoView;
