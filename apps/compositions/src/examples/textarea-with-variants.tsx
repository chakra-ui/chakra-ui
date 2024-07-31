import { Stack, Textarea } from "@chakra-ui/react"

export const TextareaWithVariants = () => {
  return (
    <Stack gap="4">
      <Textarea variant="outline" placeholder="outline" />
      <Textarea variant="filled" placeholder="filled" />
      <Textarea variant="flushed" placeholder="filled" />
    </Stack>
  )
}
