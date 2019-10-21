import { useLayoutEffect } from "react";

function useFocusEffect(isFocused: boolean, ref: React.RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    if (isFocused && ref.current) {
      ref.current.focus();
    }
  }, [isFocused, ref]);
}

export default useFocusEffect;
