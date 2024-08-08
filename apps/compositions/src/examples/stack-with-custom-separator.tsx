import { Separator, Stack } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const StackWithCustomSeparator = () => (
  <Stack separator={<Separator borderColor="red.500" />}>
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
  </Stack>
)
