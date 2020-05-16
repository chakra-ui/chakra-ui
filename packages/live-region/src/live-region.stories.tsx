import * as React from "react"
import { useLiveRegion } from "."

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
