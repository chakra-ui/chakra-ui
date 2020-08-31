import * as React from "react"
import { Box, GridColumn, SimpleGrid } from "../src"

export default {
  title: "SimpleGrid",
}

export const WithColumns = () => (
  <SimpleGrid columns={[2, null, 3]} spacing="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </SimpleGrid>
)

export const WithAutofit = () => (
  <SimpleGrid minChildWidth="300px" spacing="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </SimpleGrid>
)

export const WithColSpan = () => (
  <SimpleGrid
    columns={{ base: 2, md: 4 }}
    spacing={{ base: "24px", md: "40px" }}
  >
    <GridColumn bg="green.500" span={{ base: 1, md: 3 }}>
      Column 1
    </GridColumn>
    <GridColumn bg="pink.500" span={{ base: 1, md: 1 }}>
      Column 2
    </GridColumn>
  </SimpleGrid>
)
