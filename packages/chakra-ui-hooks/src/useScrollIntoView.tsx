import * as React from "react";
import scrollIntoView, { Options } from "scroll-into-view-if-needed";

export interface useScrollIntoViewOptions {
  node?: HTMLElement;
  boundary?: Options["boundary"];
  behavior?: Options["behavior"];
  isEnabled?: boolean;
}

/**
 * Custom hook to scroll node into view if needed
 *
 * @param {HTMLElement} node the element that should scroll into view
 * @param {HTMLElement} boundary the boundary element of the component
 * @param {Boolean} isEnabled the condition to re-run the scrollIntoView effect
 */
function useScrollIntoView({
  isEnabled,
  node,
  boundary,
  behavior = "instant",
}: useScrollIntoViewOptions) {
  React.useEffect(() => {
    if (node == null) {
      return;
    }
    if (isEnabled) {
      scrollIntoView(node, {
        boundary: boundary,
        behavior: behavior,
        block: "nearest",
        scrollMode: "if-needed",
      });
    }
  }, [isEnabled]);
}

export default useScrollIntoView;
