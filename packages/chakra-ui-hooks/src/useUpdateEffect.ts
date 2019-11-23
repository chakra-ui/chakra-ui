import * as React from "react";

/**
 * React effect hook that invokes only on update.
 * It doesn't invoke on mount
 */
const useUpdateEffect: typeof React.useEffect = (effect, deps) => {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (mounted.current) {
      return effect();
    }
    mounted.current = true;
    return undefined;
  }, deps);

  return mounted.current;
};

export default useUpdateEffect;
