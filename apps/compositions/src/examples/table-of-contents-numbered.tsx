"use client"

import { Circle, HStack, TableOfContents, Text } from "@chakra-ui/react"

export const TableOfContentsNumbered = () => {
  return (
    <TableOfContents.Root maxW="64" defaultValue={["brief"]}>
      <TableOfContents.Title>Project journey</TableOfContents.Title>
      <TableOfContents.List gap="2">
        {items.map((item, index) => (
          <TableOfContents.Item key={item.value} value={item.value}>
            <TableOfContents.Link
              gap="3"
              _current={{
                "& [data-number]": {
                  bg: "colorPalette.solid",
                  color: "colorPalette.contrast",
                },
              }}
            >
              <Circle data-number size="7" bg="bg.muted" fontSize="xs">
                {index + 1}
              </Circle>
              <HStack gap="1">
                <Text>{item.label}</Text>
              </HStack>
            </TableOfContents.Link>
          </TableOfContents.Item>
        ))}
      </TableOfContents.List>
    </TableOfContents.Root>
  )
}

const items = [
  { value: "brief", label: "Read the brief" },
  { value: "explore", label: "Explore directions" },
  { value: "prototype", label: "Build a prototype" },
  { value: "deliver", label: "Deliver the work" },
]
