import * as React from "react"
import useLiveRegion from "./live-region.hook"

export default {
  title: "Live Region",
}

export function PoliteExample() {
  const region = useLiveRegion()
  return (
    <button
      onClick={() => {
        region.speak("Filtering categories was successful")
      }}
    >
      Click me
    </button>
  )
}
