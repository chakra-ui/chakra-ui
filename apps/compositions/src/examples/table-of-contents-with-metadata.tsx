"use client"

import { Badge, HStack, Spacer, TableOfContents, Text } from "@chakra-ui/react"

export const TableOfContentsWithMetadata = () => {
  return (
    <TableOfContents.Root maxW="72" variant="line" defaultValue={["setup"]}>
      <TableOfContents.Title>Workshop itinerary</TableOfContents.Title>
      <TableOfContents.List>
        {items.map((item) => (
          <TableOfContents.Item key={item.value} value={item.value}>
            <TableOfContents.Link gap="3">
              <HStack minW="0" gap="2">
                <Text truncate>{item.label}</Text>
                {item.new && <Badge colorPalette="green">New</Badge>}
              </HStack>
              <Spacer />
              <Text as="span" color="fg.subtle" textStyle="xs">
                {item.duration}
              </Text>
            </TableOfContents.Link>
          </TableOfContents.Item>
        ))}
      </TableOfContents.List>
    </TableOfContents.Root>
  )
}

const items = [
  { value: "setup", label: "Project setup", duration: "5 min" },
  { value: "tokens", label: "Design tokens", duration: "12 min", new: true },
  { value: "recipes", label: "Component recipes", duration: "18 min" },
  { value: "shipping", label: "Ship the system", duration: "8 min" },
]
