import { Input, Stack } from "@chakra-ui/react"

export const InputWithSizes = () => {
  return (
    <Stack gap="4">
      <Input placeholder="size (xs)" size="xs" />
      <Input placeholder="size (sm)" size="sm" />
      <Input placeholder="size (md)" size="md" />
      <Input placeholder="size (lg)" size="lg" />
    </Stack>
  )
}
