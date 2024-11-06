import { SimpleGrid } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SimpleGridWithRowAndColGap = () => {
  return (
    <SimpleGrid columns={2} columnGap="6" rowGap="8" gap="40px">
      <DecorativeBox height="20" />
      <DecorativeBox height="20" />
      <DecorativeBox height="20" />
      <DecorativeBox height="20" />
    </SimpleGrid>
  )
}
