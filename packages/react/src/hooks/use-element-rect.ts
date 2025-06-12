"use client"

import { useEnvironmentContext } from "@ark-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"

export function useElementRect() {
  const ref = useRef<HTMLElement | null>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const env = useEnvironmentContext()

  // Extract the calculation logic to a callback
  const updateRect = useCallback(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect())
    }
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Calculate initial size
    updateRect()

    const win = env.getWindow()
    if (!win) return

    // Use ResizeObserver for size changes
    const resizeObserver = new win.ResizeObserver(updateRect)
    resizeObserver.observe(node)

    // Also listen for scroll and resize events for position changes
    win.addEventListener("resize", updateRect)
    win.addEventListener("scroll", updateRect)

    return () => {
      resizeObserver.disconnect()
      win.removeEventListener("resize", updateRect)
      win.removeEventListener("scroll", updateRect)
    }
  }, [env, updateRect])

  return { ref, rect }
}
