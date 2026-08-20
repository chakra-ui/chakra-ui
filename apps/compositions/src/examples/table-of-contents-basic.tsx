"use client"

import {
  Grid,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  TableOfContents,
} from "@chakra-ui/react"

export const TableOfContentsBasic = () => {
  return (
    <Grid
      templateColumns={{ base: "minmax(0, 1fr)", lg: "16rem minmax(0, 1fr)" }}
      gap={{ base: "8", lg: "14" }}
      maxW="6xl"
      mx="auto"
    >
      <TableOfContents.Root
        alignSelf="start"
        position={{ lg: "sticky" }}
        top="8"
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="l3"
        boxShadow="sm"
        p="4"
      >
        <TableOfContents.Title>On this page</TableOfContents.Title>
        <TableOfContents.List>
          {sections.map((section) => (
            <TableOfContents.Item key={section.id} value={section.id}>
              <TableOfContents.Link>{section.title}</TableOfContents.Link>
            </TableOfContents.Item>
          ))}
        </TableOfContents.List>
      </TableOfContents.Root>

      <Stack gap={{ base: "14", md: "20" }} maxW="3xl" minW="0">
        {sections.map((section) => (
          <Stack key={section.id} id={section.id} scrollMarginTop="6" gap="3">
            <Heading size="xl">{section.title}</Heading>
            <SkeletonText noOfLines={3} gap="3" maxW="xl" />
            <Skeleton height="36" borderRadius="l2" />
          </Stack>
        ))}
      </Stack>
    </Grid>
  )
}

const sections = [
  {
    id: "overview",
    title: "Overview",
  },
  {
    id: "installation",
    title: "Installation",
  },
  {
    id: "usage",
    title: "Usage",
  },
  {
    id: "accessibility",
    title: "Accessibility",
  },
]
