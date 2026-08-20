"use client"

import { ScrollArea, TableOfContents } from "@chakra-ui/react"

export const TableOfContentsLongDocument = () => {
  return (
    <ScrollArea.Root maxH="64" maxW="72" variant="hover">
      <ScrollArea.Viewport>
        <ScrollArea.Content paddingEnd="4">
          <TableOfContents.Root variant="line" defaultValue={["chapter-1"]}>
            <TableOfContents.Title>Developer handbook</TableOfContents.Title>
            <TableOfContents.List>
              {items.map((item) => (
                <TableOfContents.Item
                  key={item.value}
                  value={item.value}
                  depth={item.depth}
                >
                  <TableOfContents.Link>{item.label}</TableOfContents.Link>
                </TableOfContents.Item>
              ))}
            </TableOfContents.List>
          </TableOfContents.Root>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}

const items = Array.from({ length: 6 }, (_, chapterIndex) => [
  {
    value: `chapter-${chapterIndex + 1}`,
    label: `Chapter ${chapterIndex + 1}`,
    depth: 0,
  },
  {
    value: `chapter-${chapterIndex + 1}-concepts`,
    label: "Key concepts",
    depth: 1,
  },
  {
    value: `chapter-${chapterIndex + 1}-exercise`,
    label: "Practice exercise",
    depth: 1,
  },
]).flat()
