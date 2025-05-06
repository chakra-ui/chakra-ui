import { Stack, Textarea } from "@sh3yk0-ui/react"

export const TextareaWithVariants = () => {
  return (
    <Stack gap="4">
      <Textarea variant="outline" placeholder="outline" />
      <Textarea variant="subtle" placeholder="subtle" />
      <Textarea variant="flushed" placeholder="flushed" />
    </Stack>
  )
}
