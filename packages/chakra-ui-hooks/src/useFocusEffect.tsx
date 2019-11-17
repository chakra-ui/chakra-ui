import * as React from "react";
import { hasFocusWithin } from "@chakra-ui/utils";

function useFocusEffect(isFocused: boolean, ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    if (!ref.current) {
      console.warn(
        "Can't focus element because `ref` wasn't passed to component.",
      );
      return;
    }
    if (isFocused && ref.current && !hasFocusWithin(ref.current)) {
      ref.current.focus();
    }
  }, [isFocused, ref]);
}

export default useFocusEffect;
