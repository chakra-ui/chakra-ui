"use client"

import { Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { LuArrowUpCircle } from "react-icons/lu"

function useScrollPosition() {
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

export const BackToTop = () => {
  const percent = useScrollPosition()
  const show = percent > 0.25

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={scrollToTop}
      visibility={show ? "visible" : "hidden"}
      data-state={show ? "open" : "closed"}
      animationDuration="0.2s"
      _open={{ animationName: "fade-in" }}
      _closed={{ animationName: "fade-out" }}
    >
      <LuArrowUpCircle />
      Back to top
    </Button>
  )
}
