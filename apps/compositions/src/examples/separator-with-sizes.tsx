import { Separator, Stack } from "@sh3yk0-ui/react"

export const SeparatorWithSizes = () => {
  return (
    <Stack gap="4">
      <Separator size="xs" />
      <Separator size="sm" />
      <Separator size="md" />
      <Separator size="lg" />
    </Stack>
  )
}
