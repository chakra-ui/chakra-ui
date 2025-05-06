import { Stack } from "@sh3yk0-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const StackWithResponsiveDirection = () => {
  return (
    <Stack direction={{ base: "column", md: "row" }} gap="10">
      <DecorativeBox boxSize="20" />
      <DecorativeBox boxSize="20" />
      <DecorativeBox boxSize="20" />
    </Stack>
  )
}
