import { Input, Stack } from "@chakra-ui/react"

export const InputWithVariants = () => {
  return (
    <Stack gap="4">
      <Input placeholder="Filled" variant="subtle" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Flushed" variant="flushed" />
    </Stack>
  )
}
