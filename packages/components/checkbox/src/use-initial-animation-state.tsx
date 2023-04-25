import { useState } from "react"

export function useInitialAnimationState(isChecked: boolean) {
  const [previousIsChecked, setPreviousIsChecked] = useState(isChecked)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  if (isChecked !== previousIsChecked) {
    setShouldAnimate(true)
    setPreviousIsChecked(isChecked)
  }

  return shouldAnimate
}
