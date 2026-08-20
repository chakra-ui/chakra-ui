"use client"

import { Grid, Stack, TableOfContents, Text } from "@chakra-ui/react"

export const TableOfContentsWithVariants = () => {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 16rem))" }}
      gap="8"
    >
      {(["plain", "line"] as const).map((variant) => (
        <Stack
          key={variant}
          gap="3"
          bg="bg.panel"
          borderWidth="1px"
          borderColor="border.subtle"
          borderRadius="l3"
          boxShadow="sm"
          p="5"
        >
          <Text fontWeight="medium" textTransform="capitalize">
            {variant}
          </Text>
          <TableOfContents.Root variant={variant} defaultValue={["overview"]}>
            <TableOfContents.Title>On this page</TableOfContents.Title>
            <TableOfContents.List>
              <TableOfContents.Item value="overview">
                <TableOfContents.Link>Overview</TableOfContents.Link>
              </TableOfContents.Item>
              <TableOfContents.Item value="installation">
                <TableOfContents.Link>Installation</TableOfContents.Link>
              </TableOfContents.Item>
              <TableOfContents.Item value="usage" depth={1}>
                <TableOfContents.Link>Usage</TableOfContents.Link>
              </TableOfContents.Item>
            </TableOfContents.List>
          </TableOfContents.Root>
        </Stack>
      ))}
    </Grid>
  )
}
