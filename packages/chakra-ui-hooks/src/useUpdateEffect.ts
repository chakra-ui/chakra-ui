import * as React from "react";

function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: ReadonlyArray<any> | undefined,
) {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (mounted.current) {
      return effect();
    }
    mounted.current = true;
    return undefined;
  }, deps);
}

export default useUpdateEffect;
