"use client"

import { TableOfContents } from "@chakra-ui/react"

export const TableOfContentsWithCustomStyles = () => {
  return (
    <TableOfContents.Root
      maxW="64"
      defaultValue={["foundations"]}
      css={{
        "& [data-part=link]": {
          borderRadius: "full",
          paddingInline: "4",
          _current: {
            background: "purple.subtle",
            color: "purple.fg",
          },
        },
      }}
    >
      <TableOfContents.Title color="purple.fg">
        Design handbook
      </TableOfContents.Title>
      <TableOfContents.List gap="2">
        {items.map((item) => (
          <TableOfContents.Item key={item.value} value={item.value}>
            <TableOfContents.Link>{item.label}</TableOfContents.Link>
          </TableOfContents.Item>
        ))}
      </TableOfContents.List>
    </TableOfContents.Root>
  )
}

const items = [
  { value: "foundations", label: "01 — Foundations" },
  { value: "voice", label: "02 — Voice and tone" },
  { value: "motion", label: "03 — Motion" },
  { value: "patterns", label: "04 — Patterns" },
]
