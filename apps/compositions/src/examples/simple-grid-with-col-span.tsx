import { GridItem, SimpleGrid } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SimpleGridWithColSpan = () => (
  <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: "24px", md: "40px" }}>
    <GridItem colSpan={{ base: 1, md: 3 }}>
      <DecorativeBox height="20">Column 1</DecorativeBox>
    </GridItem>
    <GridItem colSpan={{ base: 1, md: 1 }}>
      <DecorativeBox height="20">Column 2</DecorativeBox>
    </GridItem>
  </SimpleGrid>
)
