import { Input, Stack } from "@chakra-ui/react"

export const InputWithVariants = () => {
  return (
    <Stack gap="4">
      <Input placeholder="Filed" variant="filled" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Flushed" variant="flushed" />
    </Stack>
  )
}
