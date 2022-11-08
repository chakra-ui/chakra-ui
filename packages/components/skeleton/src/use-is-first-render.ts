import { useEffect, useRef } from "react"

export function useIsFirstRender() {
  const isFirstRender = useRef(true)

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return isFirstRender.current
}
