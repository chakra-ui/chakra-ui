"use client"

import { useEffect, useState } from "react"

export function useScrollPosition() {
  const [percent, setPercent] = useState(0)

  function handleScroll(event: Event) {
    if (!document.scrollingElement) return

    const scrollTop =
      document.scrollingElement.scrollHeight -
      document.documentElement.clientHeight

    const scrollProgress = document.documentElement.scrollTop / scrollTop
    setPercent(scrollProgress)
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  })

  return percent
}
