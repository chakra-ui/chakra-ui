import { GridItem, SimpleGrid } from "@chakra-ui/react"

export const SimpleGridWithColSpan = () => (
  <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: "24px", md: "40px" }}>
    <GridItem bg="green.500" colSpan={{ base: 1, md: 3 }}>
      Column 1
    </GridItem>
    <GridItem bg="pink.500" colSpan={{ base: 1, md: 1 }}>
      Column 2
    </GridItem>
  </SimpleGrid>
)
