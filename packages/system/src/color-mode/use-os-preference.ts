import React from "react"
import getMediaQuery from "./get-media-query"
import { ColorModeType } from "./constants"

const isBrowser = typeof window !== "undefined"

const useIsomorphicEffect = isBrowser ? React.useLayoutEffect : React.useEffect

// Sync color mode when user changes OS preferences
function useOSPreference(callback: (mode: ColorModeType) => void) {
  useIsomorphicEffect(() => {
    if (!isBrowser) return
    const { queryList } = getMediaQuery()
    const onChangePreference = (event: MediaQueryListEvent) => {
      callback(event.matches ? "dark" : "light")
    }

    try {
      // Chrome and Firefox
      queryList.addEventListener("change", onChangePreference)
    } catch (err) {
      try {
        // Safari
        queryList.addListener(onChangePreference)
      } catch (err) {
        // no op
      }
    }

    return () => {
      try {
        // Chrome and Firefox
        queryList.removeEventListener("change", onChangePreference)
      } catch (err) {
        try {
          // Safari
          queryList.removeListener(onChangePreference)
        } catch (err) {
          // no op
        }
      }
    }
  }, [callback])
}

export default useOSPreference
