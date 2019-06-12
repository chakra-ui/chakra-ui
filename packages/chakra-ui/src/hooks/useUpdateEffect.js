import { useRef, useEffect } from "react";

function useUpdateEffect(effect, deps) {
  const mounted = useRef(false);

  let dependencies = deps && deps.length > 0 ? deps : [];

  useEffect(() => {
    if (mounted.current) {
      effect();
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export default useUpdateEffect;
