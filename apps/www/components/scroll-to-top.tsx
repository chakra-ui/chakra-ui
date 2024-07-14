"use client"

import { Button } from "@chakra-ui/react"
import { LuArrowUpCircle } from "react-icons/lu"
import { useScrollPosition } from "../lib/use-scroll-position"

export const ScrollToTop = () => {
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
