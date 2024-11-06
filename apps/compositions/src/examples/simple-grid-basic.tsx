import { SimpleGrid } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SimpleGridBasic = () => {
  return (
    <SimpleGrid columns={2} gap="40px">
      <DecorativeBox height="20" />
      <DecorativeBox height="20" />
      <DecorativeBox height="20" />
      <DecorativeBox height="20" />
    </SimpleGrid>
  )
}
