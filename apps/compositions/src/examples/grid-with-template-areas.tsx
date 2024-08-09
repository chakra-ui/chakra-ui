import { Grid, GridItem } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const GridWithTemplateAreas = () => {
  return (
    <Grid
      gap="4"
      templateAreas={`
      "one one two three"
      "four five five three"
    `}
    >
      <GridItem bg="green.500" area="one">
        <DecorativeBox minH="20">one</DecorativeBox>
      </GridItem>
      <GridItem bg="pink.500" area="two">
        <DecorativeBox minH="20">two</DecorativeBox>
      </GridItem>
      <GridItem bg="red.500" area="three">
        <DecorativeBox minH="20">three</DecorativeBox>
      </GridItem>
      <GridItem bg="teal.500" area="four">
        <DecorativeBox minH="20">four</DecorativeBox>
      </GridItem>
      <GridItem bg="yellow.500" area="five">
        <DecorativeBox minH="20">five</DecorativeBox>
      </GridItem>
    </Grid>
  )
}
