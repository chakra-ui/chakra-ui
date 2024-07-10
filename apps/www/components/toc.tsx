"use client"

import { Box, Stack, Text, chakra } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface Props {
  items: Array<{ label: React.ReactNode; href: string; depth: number }>
}

const TocLink = chakra(Link, {
  base: {
    color: "fg.subtle",
    py: "1",
    px: "2",
    _currentPage: { color: "fg" },
    _hover: { color: "fg" },
    ms: "calc(1rem * var(--toc-depth))",
  },
})

export const Toc = (props: Props) => {
  const { items } = props
  const activeItem = useScrollSpy(items.map((entry) => entry.href))
  return (
    <Box as="nav" fontSize="sm">
      <Text fontWeight="semibold" px="2">
        On this page
      </Text>
      <Stack mt="3">
        {items.map((item, index) => (
          <TocLink
            data-toc
            id={item.href}
            key={index}
            href={item.href}
            aria-current={item.href === activeItem ? "page" : undefined}
            css={{ "--toc-depth": item.depth }}
          >
            {item.label}
          </TocLink>
        ))}
      </Stack>
    </Box>
  )
}

const useScrollSpy = (selectors: string[]) => {
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
