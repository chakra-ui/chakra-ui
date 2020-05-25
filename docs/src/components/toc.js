import React from "react"
import { Link, Heading, Stack, useColorModeValue } from "@chakra-ui/core"

export const Entry = ({ item, indent, slug }) => {
  const { url, title, items = [] } = item
  const color = useColorModeValue("gray.600", "whiteAlpha.600")

  return (
    <Stack spacing={1} pl={indent && 4} mt="1">
      <Link color={color} fontSize="sm" href={`${slug}${url}`}>
        {title}
      </Link>
      <Stack spacing={1}>
        {items.map((item) => (
          <Entry key={item.url} slug={slug} item={item} indent />
        ))}
      </Stack>
    </Stack>
  )
}

export const TableOfContents = ({ tableOfContents, slug }) => {
  // skip the first depth which is just the current page's url and title
  const {
    items: [{ items = [] }],
  } = tableOfContents

  const color = useColorModeValue("gray.600", "whiteAlpha.700")

  if (!items.length) return null

  return (
    <Stack spacing={3} position="sticky" top="0">
      <Heading
        fontSize="sm"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wide"
        color={color}
      >
        On this page
      </Heading>
      <Stack spacing={1}>
        {items.map((item) => (
          <Entry key={item.url} item={item} slug={slug} />
        ))}
      </Stack>
    </Stack>
  )
}
