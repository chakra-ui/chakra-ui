import { useState, useEffect } from "react"
import { useEnvironment } from "@chakra-ui/react-env"

export type ReducedMotionValue = boolean | "system"

export function useReducedMotion(value: ReducedMotionValue) {
  const [reducedMotion, setReducedMotion] = useState<boolean>(
    value === "system" ? false : value,
  )
  const { window: win } = useEnvironment()

  useEffect(() => {
    if (value !== "system") {
      return
    }

    const mediaQuery = win.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    handleChange()

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [value, win])

  return reducedMotion
}
