import { Separator, Stack } from "@chakra-ui/react"

export const SeparatorWithVariants = () => {
  return (
    <Stack>
      <Separator variant="solid" />
      <Separator variant="dashed" />
      <Separator variant="dotted" />
    </Stack>
  )
}
