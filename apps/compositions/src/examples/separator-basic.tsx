import { Separator, Stack, Text } from "@chakra-ui/react"

export const SeparatorBasic = () => {
  return (
    <Stack>
      <Text>First</Text>
      <Separator />
      <Text>Second</Text>
      <Separator />
      <Text>Third</Text>
    </Stack>
  )
}
