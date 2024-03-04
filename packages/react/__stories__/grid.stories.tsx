import { Grid, GridItem } from "../src"

export default {
  title: "Layout / Grid",
}

export const WithTemplateColumns = () => (
  <Grid templateColumns="repeat(5, 1fr)" gap={4}>
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
  </Grid>
)

export const WithTemplateRows = () => (
  <Grid templateRows="repeat(2, 1fr)" gap={4}>
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
  </Grid>
)

export const WithTemplateRowsAndColumns = () => (
  <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)" gap={4}>
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
    <GridItem bg="tomato" height="200px" />
  </Grid>
)

export const WithTemplateAreas = () => {
  const gridTemplateAreas = `
    "one one two three"
    "four five five three"
  `
  return (
    <Grid templateAreas={gridTemplateAreas} gap={4}>
      <GridItem bg="green.500" area="one">
        one
      </GridItem>
      <GridItem bg="pink.500" area="two">
        two
      </GridItem>
      <GridItem bg="red.500" area="three">
        three
      </GridItem>
      <GridItem bg="teal.500" area="four">
        four
      </GridItem>
      <GridItem bg="yellow.500" area="five">
        five
      </GridItem>
    </Grid>
  )
}
