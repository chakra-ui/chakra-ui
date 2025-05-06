import { Input, Stack } from "@sh3yk0-ui/react"

export const InputWithVariants = () => {
  return (
    <Stack gap="4">
      <Input placeholder="Subtle" variant="subtle" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Flushed" variant="flushed" />
    </Stack>
  )
}
