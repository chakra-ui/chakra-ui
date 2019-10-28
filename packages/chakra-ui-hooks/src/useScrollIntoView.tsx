import * as React from "react";
import scrollIntoView, { Options } from "scroll-into-view-if-needed";

export interface useScrollIntoViewOptions {
  node?: HTMLElement;
  boundary?: Options["boundary"];
  behavior?: Options["behavior"];
  isEnabled?: boolean;
}

function useScrollIntoView({
  isEnabled,
  node,
  boundary,
  behavior = "instant",
}: useScrollIntoViewOptions) {
  React.useEffect(() => {
    if (isEnabled && node) {
      scrollIntoView(node, {
        boundary: boundary,
        behavior: behavior,
        scrollMode: "if-needed",
      });
    }
  }, [isEnabled]);
}

export default useScrollIntoView;
