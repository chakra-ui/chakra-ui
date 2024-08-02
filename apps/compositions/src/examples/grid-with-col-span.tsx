import { Grid, GridItem } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const GridWithColSpan = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      <GridItem colSpan={2}>
        <DecorativeBox h="20" />
      </GridItem>
      <GridItem colSpan={1}>
        <DecorativeBox h="20" />
      </GridItem>
      <GridItem colSpan={1}>
        <DecorativeBox h="20" />
      </GridItem>
    </Grid>
  )
}
