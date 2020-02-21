import React from "react"
import Box from "../Box"
import SimpleGrid from "../SimpleGrid"

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
