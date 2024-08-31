import { Radiomark, Stack } from "@chakra-ui/react"

export const RadiomarkBasic = () => {
  return (
    <Stack colorPalette="accent">
      <Radiomark />
      <Radiomark checked />
      <Radiomark disabled />
      <Radiomark checked disabled />
    </Stack>
  )
}
