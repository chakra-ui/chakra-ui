"use client"

import {
  Box,
  Grid,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  TableOfContents,
  Text,
} from "@chakra-ui/react"

export const TableOfContentsWithRootMargin = () => {
  return (
    <Box>
      <Box
        position="sticky"
        top="0"
        zIndex="docked"
        bg="bg.panel"
        borderBottomWidth="1px"
        py="3"
        mb="8"
      >
        <Text fontWeight="semibold">Sticky documentation header</Text>
      </Box>
      <Grid templateColumns={{ base: "1fr", md: "14rem 1fr" }} gap="10">
        <TableOfContents.Root
          variant="line"
          rootMargin="-80px 0px -70%"
          alignSelf="start"
          position={{ md: "sticky" }}
          top="20"
        >
          <TableOfContents.Title>API reference</TableOfContents.Title>
          <TableOfContents.List>
            {items.map((item) => (
              <TableOfContents.Item key={item.value} value={item.value}>
                <TableOfContents.Link>{item.label}</TableOfContents.Link>
              </TableOfContents.Item>
            ))}
          </TableOfContents.List>
        </TableOfContents.Root>

        <Stack gap="14">
          {items.map((item) => (
            <Stack
              key={item.value}
              id={item.value}
              scrollMarginTop="20"
              gap="4"
            >
              <Heading size="lg">{item.label}</Heading>
              <SkeletonText noOfLines={3} gap="3" />
              <Skeleton height="40" borderRadius="l2" />
            </Stack>
          ))}
        </Stack>
      </Grid>
    </Box>
  )
}

const items = [
  { value: "properties", label: "Properties" },
  { value: "events", label: "Events" },
  { value: "methods", label: "Methods" },
  { value: "css-variables", label: "CSS variables" },
]
