"use client"

import {
  Badge,
  Grid,
  HStack,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  TableOfContents,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"

export const TableOfContentsControlled = () => {
  const [value, setValue] = useState<string[]>(["introduction"])

  return (
    <Grid
      templateColumns={{ base: "minmax(0, 1fr)", lg: "16rem minmax(0, 1fr)" }}
      gap={{ base: "8", lg: "14" }}
      maxW="6xl"
      mx="auto"
    >
      <Stack
        alignSelf="start"
        position={{ lg: "sticky" }}
        top="8"
        gap="4"
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="l3"
        p="4"
      >
        <TableOfContents.Root
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <TableOfContents.Title>Release notes</TableOfContents.Title>
          <TableOfContents.List>
            {sections.map((section) => (
              <TableOfContents.Item key={section.id} value={section.id}>
                <TableOfContents.Link>{section.title}</TableOfContents.Link>
              </TableOfContents.Item>
            ))}
          </TableOfContents.List>
        </TableOfContents.Root>
        <HStack gap="2" wrap="wrap">
          <Text textStyle="xs" color="fg.muted">
            Active:
          </Text>
          {value.map((item) => (
            <Badge key={item} colorPalette="teal" variant="subtle">
              {item}
            </Badge>
          ))}
        </HStack>
      </Stack>

      <Stack gap="14">
        {sections.map((section) => (
          <Stack key={section.id} id={section.id} gap="4">
            <Heading size="xl">{section.title}</Heading>
            <SkeletonText noOfLines={3} gap="3" />
            <Skeleton height="40" borderRadius="l2" />
          </Stack>
        ))}
      </Stack>
    </Grid>
  )
}

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "highlights", title: "Highlights" },
  { id: "breaking-changes", title: "Breaking changes" },
  { id: "migration", title: "Migration" },
]
