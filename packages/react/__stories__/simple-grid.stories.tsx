import type { Meta } from "@storybook/react"
import { Box, GridItem, SimpleGrid } from "../src"
import { DecorativeBox } from "./shared/decorative-box"

export default {
  title: "Layout / SimpleGrid",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export const WithColumns = () => (
  <SimpleGrid columns={[2, null, 3]} gap="40px">
    <DecorativeBox height="200px" />
    <DecorativeBox height="200px" />
    <DecorativeBox height="200px" />
    <DecorativeBox height="200px" />
    <DecorativeBox height="200px" />
  </SimpleGrid>
)

export const WithAutofit = () => (
  <SimpleGrid minChildWidth="sm" gap="40px">
    <DecorativeBox bg="tomato" height="200px" />
    <DecorativeBox bg="tomato" height="200px" />
    <DecorativeBox bg="tomato" height="200px" />
    <DecorativeBox bg="tomato" height="200px" />
    <DecorativeBox bg="tomato" height="200px" />
  </SimpleGrid>
)

export const WithColSpan = () => (
  <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: "24px", md: "40px" }}>
    <GridItem bg="green.500" colSpan={{ base: 1, md: 3 }}>
      Column 1
    </GridItem>
    <GridItem bg="pink.500" colSpan={{ base: 1, md: 1 }}>
      Column 2
    </GridItem>
  </SimpleGrid>
)
