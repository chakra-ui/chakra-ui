"use client"

import { useEffect, useMemo, useRef, useState } from "react"

export const useScrollSpy = (selectors: string[]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableSelectors = useMemo(() => selectors, [JSON.stringify(selectors)])

  const [activeIds, setActiveIds] = useState<Set<string>>(
    () => new Set(stableSelectors[0] ? [stableSelectors[0]] : []),
  )
  const observer = useRef<IntersectionObserver | null>(null)
  const visibleIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    visibleIds.current = new Set()

    const elements = stableSelectors.map((selector) =>
      document.querySelector(`[id='${selector.replace("#", "")}']`),
    )

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.getAttribute("id")}`
          if (entry.isIntersecting) {
            visibleIds.current.add(id)
          } else {
            visibleIds.current.delete(id)
          }
        }

        if (visibleIds.current.size > 0) {
          setActiveIds(new Set(visibleIds.current))
        }
      },
      { rootMargin: "-30% 0px" },
    )

    for (const element of elements) {
      if (element) observer.current?.observe(element)
    }
    return () => observer.current?.disconnect()
  }, [stableSelectors])

  return activeIds
}
