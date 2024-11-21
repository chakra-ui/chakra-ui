import { Box, Stack } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const StackWithSeparator = () => {
  return (
    <Stack separator={<Box>∙</Box>}>
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
    </Stack>
  )
}
