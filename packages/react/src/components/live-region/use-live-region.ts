import { useEffect, useState } from "react"
import { LiveRegion, LiveRegionOptions } from "./live-region"

export function useLiveRegion(options?: LiveRegionOptions) {
  const [liveRegion] = useState(() => new LiveRegion(options))

  useEffect(
    () => () => {
      liveRegion.destroy()
    },
    [liveRegion],
  )

  return liveRegion
}
