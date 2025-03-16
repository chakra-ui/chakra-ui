"use client"

import { useEnvironmentContext } from "@ark-ui/react"
import { useEffect, useRef, useState } from "react"

export function useElementRect() {
  const ref = useRef<HTMLElement | null>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const env = useEnvironmentContext()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleResize = () => {
      setRect(node.getBoundingClientRect())
    }

    const win = env.getWindow()
    if (!win) return

    const observer = new win.ResizeObserver(handleResize)
    observer.observe(node)

    return () => observer.disconnect()
  }, [env])

  return { ref, rect }
}
