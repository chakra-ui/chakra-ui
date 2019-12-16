import * as React from "react";

function useClientRect() {
  const [rect, setRect] = React.useState<ClientRect | null>(null);
  const ref = React.useCallback((node: HTMLElement) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref] as const;
}

export default useClientRect;
