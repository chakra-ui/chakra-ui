import * as React from "react"
import LiveRegion, { LiveRegionOptions } from "./live-region"

export function useLiveRegion(options?: LiveRegionOptions) {
  const [liveRegion] = React.useState(() => {
    return new LiveRegion(options)
  })

  React.useEffect(() => {
    return () => {
      liveRegion.destroy()
    }
  }, [liveRegion])

  return liveRegion
}

export default useLiveRegion
