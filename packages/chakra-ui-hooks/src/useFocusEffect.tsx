import * as React from "react";

function useFocusEffect(isFocused: boolean, ref: React.RefObject<HTMLElement>) {
  React.useLayoutEffect(() => {
    if (!ref.current) {
      console.warn(
        "Can't focus element because `ref` wasn't passed to component.",
      );
      return;
    }
    if (isFocused && ref.current) {
      ref.current.focus();
    }
  }, [isFocused, ref]);
}

export default useFocusEffect;
