import { Grid } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const GridBasic = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="6">
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
    </Grid>
  )
}
