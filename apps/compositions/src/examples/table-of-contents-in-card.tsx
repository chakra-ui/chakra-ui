"use client"

import { Badge, Card, HStack, TableOfContents, Text } from "@chakra-ui/react"

export const TableOfContentsInCard = () => {
  return (
    <Card.Root maxW="sm" variant="outline">
      <Card.Header>
        <HStack justify="space-between">
          <Card.Title>v4.2 migration</Card.Title>
          <Badge colorPalette="orange">8 min</Badge>
        </HStack>
        <Card.Description>
          Jump directly to the part of the migration you need.
        </Card.Description>
      </Card.Header>
      <Card.Body pt="0">
        <TableOfContents.Root
          variant="line"
          defaultValue={["before-you-start"]}
        >
          <TableOfContents.List>
            {items.map((item) => (
              <TableOfContents.Item key={item.value} value={item.value}>
                <TableOfContents.Link>
                  <Text truncate>{item.label}</Text>
                </TableOfContents.Link>
              </TableOfContents.Item>
            ))}
          </TableOfContents.List>
        </TableOfContents.Root>
      </Card.Body>
    </Card.Root>
  )
}

const items = [
  { value: "before-you-start", label: "Before you start" },
  { value: "package-changes", label: "Package changes" },
  { value: "renamed-props", label: "Renamed props" },
  { value: "codemod", label: "Run the codemod" },
]
