import { Wrap } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const WrapWithRowColumnGap = () => (
  <Wrap rowGap={["0px", "24px"]} columnGap={["4px", "12px"]}>
    {Array.from({ length: 10 }).map((_, index) => (
      <DecorativeBox key={index} w="12" h="12" />
    ))}
  </Wrap>
)
