import { Group } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const GroupBasic = () => {
  return (
    <Group>
      <DecorativeBox h="20" w="40">
        1
      </DecorativeBox>
      <DecorativeBox h="20" w="40">
        2
      </DecorativeBox>
    </Group>
  )
}
