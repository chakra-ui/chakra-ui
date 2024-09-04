"use client"

import { Box, Stack, Text, chakra } from "@chakra-ui/react"
import Link from "next/link"
import { useScrollSpy } from "../lib/use-scroll-spy"

interface TocItem {
  title: React.ReactNode
  url: string
  depth: number
}

interface Props {
  items: TocItem[]
}

const TocLink = chakra(Link, {
  base: {
    fontSize: "sm",
    color: "fg.subtle",
    _currentPage: { color: "fg", fontWeight: "medium" },
    _hover: { color: "fg" },
    ms: "calc(1rem * var(--toc-depth))",
  },
})

export const Toc = (props: Props) => {
  const { items } = props
  const activeItem = useScrollSpy(items.map((entry) => entry.url))

  if (!items.length) {
    return <div />
  }

  return (
    <Box as="nav" fontSize="sm">
      <Text fontWeight="semibold">On this page</Text>
      <Stack mt="3">
        {items.map((item, index) => (
          <TocLink
            data-toc
            id={item.url}
            key={index}
            href={item.url}
            aria-current={item.url === activeItem ? "page" : undefined}
            css={{ "--toc-depth": item.depth }}
          >
            {item.title}
          </TocLink>
        ))}
      </Stack>
    </Box>
  )
}
