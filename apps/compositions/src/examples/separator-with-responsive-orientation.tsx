import { Separator, Stack } from "@sh3yk0-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SeparatorWithResponsiveOrientation = () => {
  return (
    <Stack direction={{ base: "row", md: "column" }} align="stretch">
      <DecorativeBox>First</DecorativeBox>
      <Separator orientation={{ base: "vertical", sm: "horizontal" }} />
      <DecorativeBox>Second</DecorativeBox>
    </Stack>
  )
}
