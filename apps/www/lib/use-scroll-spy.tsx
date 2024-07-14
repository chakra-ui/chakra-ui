"use client"

import { useEffect, useRef, useState } from "react"

export const useScrollSpy = (selectors: string[]) => {
  const [activeId, setActiveId] = useState<string | null>(selectors[0])
  const [previousId, setPreviousId] = useState<string | null>()
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = selectors.map((selector) =>
      document.querySelector(`[id='${selector.replace("#", "")}']`),
    )

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.getAttribute("id")}`
          if (entry?.isIntersecting) {
            setPreviousId(activeId)
            setActiveId(id)
          } else {
            if (id === previousId) {
              setPreviousId(null)
            }
            if (activeId === id && previousId) {
              setActiveId(previousId)
            }
          }
        }
      },
      { rootMargin: "-30% 0px" },
    )

    for (const element of elements) {
      if (element) observer.current?.observe(element)
    }
    return () => observer.current?.disconnect()
  }, [selectors, previousId, activeId])

  return activeId
}
