"use client"

import {
  Grid,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  TableOfContents,
} from "@chakra-ui/react"

export const TableOfContentsResponsive = () => {
  return (
    <Grid
      templateColumns={{ base: "minmax(0, 1fr)", lg: "15rem minmax(0, 1fr)" }}
      gap={{ base: "8", lg: "12" }}
      maxW="6xl"
      mx="auto"
    >
      <TableOfContents.Root
        defaultValue={["intro"]}
        overflowX={{ base: "auto", lg: "visible" }}
        alignSelf="start"
        position={{ base: "sticky", lg: "sticky" }}
        top={{ base: "0", lg: "8" }}
        zIndex="docked"
        bg="bg.panel"
        borderBottomWidth={{ base: "1px", lg: "0" }}
        borderWidth={{ lg: "1px" }}
        borderColor="border.subtle"
        borderRadius={{ lg: "l3" }}
        p={{ base: "2", lg: "4" }}
      >
        <TableOfContents.Title hideBelow="lg">
          On this page
        </TableOfContents.Title>
        <TableOfContents.List
          flexDirection={{ base: "row", lg: "column" }}
          width={{ base: "max-content", lg: "auto" }}
        >
          {items.map((item) => (
            <TableOfContents.Item key={item.value} value={item.value}>
              <TableOfContents.Link
                whiteSpace="nowrap"
                borderRadius={{ base: "full", lg: "l1" }}
                px={{ base: "4", lg: "3" }}
              >
                {item.label}
              </TableOfContents.Link>
            </TableOfContents.Item>
          ))}
        </TableOfContents.List>
      </TableOfContents.Root>

      <Stack gap="10">
        {items.map((item) => (
          <Stack key={item.value} id={item.value} gap="4">
            <Heading size="lg">{item.label}</Heading>
            <SkeletonText noOfLines={2} gap="3" />
            <Skeleton height={{ base: "28", md: "36" }} borderRadius="l2" />
          </Stack>
        ))}
      </Stack>
    </Grid>
  )
}

const items = [
  { value: "intro", label: "Introduction" },
  { value: "principles", label: "Principles" },
  { value: "examples", label: "Examples" },
  { value: "resources", label: "Resources" },
]
