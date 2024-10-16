import { Stack, Textarea } from "@chakra-ui/react"

export const TextareaWithSizes = () => {
  return (
    <Stack gap="4">
      <Textarea size="xs" placeholder="XSmall size" />
      <Textarea size="sm" placeholder="Small size" />
      <Textarea size="md" placeholder="Medium size" />
      <Textarea size="lg" placeholder="Large size" />
      <Textarea size="xl" placeholder="XLarge size" />
    </Stack>
  )
}
