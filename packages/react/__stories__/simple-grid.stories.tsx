import { Box, GridItem, SimpleGrid } from "../src"

export default {
  title: "Layout / SimpleGrid",
}

export const WithColumns = () => (
  <SimpleGrid columns={[2, null, 3]} spacing="40px">
    <Box bg="tomato" height="200px" />
    <Box bg="tomato" height="200px" />
    <Box bg="tomato" height="200px" />
    <Box bg="tomato" height="200px" />
    <Box bg="tomato" height="200px" />
  </SimpleGrid>
)

export const WithAutofit = () => (
  <SimpleGrid minChildWidth="sm" spacing="40px">
    <Box bg="tomato" height="200px" />
    <Box bg="tomato" height="200px" />
    <Box bg="tomato" height="200px" />
    <Box bg="tomato" height="200px" />
    <Box bg="tomato" height="200px" />
  </SimpleGrid>
)

export const WithColSpan = () => (
  <SimpleGrid
    columns={{ base: 2, md: 4 }}
    spacing={{ base: "24px", md: "40px" }}
  >
    <GridItem bg="green.500" colSpan={{ base: 1, md: 3 }}>
      Column 1
    </GridItem>
    <GridItem bg="pink.500" colSpan={{ base: 1, md: 1 }}>
      Column 2
    </GridItem>
  </SimpleGrid>
)
