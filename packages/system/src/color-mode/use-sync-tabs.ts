import React from "react";
import { ColorModeValue } from "./constants";

// Sync color mode between tabs
export function useSyncTabs(
  storageKey: string,
  callback: (mode: ColorModeValue) => void,
) {
  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        if (!event.newValue) return;
        callback(event.newValue as ColorModeValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [callback, storageKey]);
}

export default useSyncTabs;
