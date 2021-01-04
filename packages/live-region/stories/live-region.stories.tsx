import * as React from "react"
import { useLiveRegion } from "../src"

export default {
  title: "Live Region",
}

export const PoliteExample = () => {
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
