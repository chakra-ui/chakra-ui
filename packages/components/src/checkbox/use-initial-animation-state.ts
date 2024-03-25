import { useState } from "react"

export function useInitialAnimationState(checked: boolean) {
  const [previousIsChecked, setPreviousIsChecked] = useState(checked)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  if (checked !== previousIsChecked) {
    setShouldAnimate(true)
    setPreviousIsChecked(checked)
  }

  return shouldAnimate
}
