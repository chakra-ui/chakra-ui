"use client"

import {
  Grid,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  TableOfContents,
} from "@chakra-ui/react"

export const TableOfContentsNested = () => {
  return (
    <Grid
      templateColumns={{ base: "minmax(0, 1fr)", lg: "16rem minmax(0, 1fr)" }}
      gap={{ base: "8", lg: "14" }}
      maxW="6xl"
      mx="auto"
    >
      <TableOfContents.Root
        variant="line"
        alignSelf="start"
        position={{ lg: "sticky" }}
        top="8"
        bg="bg.panel"
        borderRadius="l3"
        borderWidth="1px"
        borderColor="border.subtle"
        p="4"
      >
        <TableOfContents.Title>Guide contents</TableOfContents.Title>
        <TableOfContents.List>
          {sections.map((section) => (
            <TableOfContents.Item
              key={section.id}
              value={section.id}
              depth={section.depth}
            >
              <TableOfContents.Link>{section.title}</TableOfContents.Link>
            </TableOfContents.Item>
          ))}
        </TableOfContents.List>
      </TableOfContents.Root>

      <Stack gap="12">
        {sections.map((section) => (
          <Stack key={section.id} id={section.id} gap="4">
            <Heading size={section.depth ? "lg" : "xl"}>
              {section.title}
            </Heading>
            <SkeletonText noOfLines={section.depth ? 2 : 3} gap="3" />
            {!section.depth && <Skeleton height="32" borderRadius="l2" />}
          </Stack>
        ))}
      </Stack>
    </Grid>
  )
}

const sections = [
  { id: "composition", title: "Composition", depth: 0 },
  { id: "root-part", title: "Root", depth: 1 },
  { id: "item-part", title: "Item", depth: 1 },
  { id: "link-part", title: "Link", depth: 1 },
  { id: "styling", title: "Styling", depth: 0 },
  { id: "responsive-styles", title: "Responsive styles", depth: 1 },
]
