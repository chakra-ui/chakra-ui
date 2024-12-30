"use client"

import { HStack, Span } from "@chakra-ui/react"
import { LuCircleArrowUp } from "react-icons/lu"
import { useScrollPosition } from "../lib/use-scroll-position"

export const ScrollToTop = () => {
  const percent = useScrollPosition()
  const show = percent > 0.25

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <HStack
      asChild
      focusRing="inside"
      focusRingWidth="2px"
      rounded="sm"
      color="fg.muted"
      cursor="pointer"
      animationDuration="0.2s"
      animationFillMode="forwards"
      data-state={show ? "open" : "closed"}
      _open={{ animationName: "fade-in" }}
      _closed={{ animationName: "fade-out" }}
      css={{ "& svg": { fontSize: "lg" } }}
    >
      <button onClick={scrollToTop}>
        <LuCircleArrowUp />
        <Span fontSize="0.8rem">Scroll to top</Span>
      </button>
    </HStack>
  )
}
