import React from "react";
import getMediaQuery from "./get-media-query";
import { ColorModeValue } from "./constants";

// Sync color mode when user changes OS preferences
function useOSPreference(callback: (mode: ColorModeValue) => void) {
  React.useEffect(() => {
    const { queryList } = getMediaQuery();
    const onChangePreference = (event: MediaQueryListEvent) => {
      callback(event.matches ? "dark" : "light");
    };
    queryList.addEventListener("change", onChangePreference);
    return () => {
      queryList.removeEventListener("change", onChangePreference);
    };
  }, [callback]);
}

export default useOSPreference;
