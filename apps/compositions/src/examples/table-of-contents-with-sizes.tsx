"use client"

import { Grid, Stack, TableOfContents, Text } from "@chakra-ui/react"

export const TableOfContentsWithSizes = () => {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 16rem))" }}
      gap="8"
    >
      {(["sm", "md"] as const).map((size) => (
        <Stack
          key={size}
          gap="3"
          bg="bg.panel"
          borderWidth="1px"
          borderColor="border.subtle"
          borderRadius="l3"
          p="5"
        >
          <Text fontWeight="medium">Size: {size}</Text>
          <TableOfContents.Root size={size} defaultValue={["overview"]}>
            <TableOfContents.Title>On this page</TableOfContents.Title>
            <TableOfContents.List>
              {items.map((item) => (
                <TableOfContents.Item key={item.value} value={item.value}>
                  <TableOfContents.Link>{item.label}</TableOfContents.Link>
                </TableOfContents.Item>
              ))}
            </TableOfContents.List>
          </TableOfContents.Root>
        </Stack>
      ))}
    </Grid>
  )
}

const items = [
  { value: "overview", label: "Overview" },
  { value: "installation", label: "Installation" },
  { value: "usage", label: "Usage" },
]
