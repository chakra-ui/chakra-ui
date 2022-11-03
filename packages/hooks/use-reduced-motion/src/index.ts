import { useState, useEffect } from "react"
import { useEnvironment } from "@chakra-ui/react-env"

export type ReducedMotionValue = boolean | "system"

export function useReducedMotion(value: ReducedMotionValue) {
  const [reduceMotion, setReduceMotion] = useState<boolean>(
    value === "system" ? false : value,
  )
  const { window: win } = useEnvironment()

  useEffect(() => {
    if (value !== "system") {
      return
    }

    const mediaQuery = win.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => {
      setReduceMotion(mediaQuery.matches)
    }
    mediaQuery.addEventListener("change", handleChange)
    handleChange()

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [value, win])

  return reduceMotion
}
