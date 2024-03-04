import { useLiveRegion } from "../src/components/live-region"

export default {
  title: "Disclosure / Live Region",
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
