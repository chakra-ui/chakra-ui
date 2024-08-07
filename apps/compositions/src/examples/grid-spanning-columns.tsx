import { Grid, GridItem } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const GridSpanningColumns = () => {
  return (
    <Grid
      h="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1}>
        <DecorativeBox>rowSpan=2</DecorativeBox>
      </GridItem>
      <GridItem colSpan={2}>
        <DecorativeBox>colSpan=2</DecorativeBox>
      </GridItem>
      <GridItem colSpan={2}>
        <DecorativeBox>colSpan=2</DecorativeBox>
      </GridItem>
      <GridItem colSpan={4}>
        <DecorativeBox>colSpan=4</DecorativeBox>
      </GridItem>
    </Grid>
  )
}
