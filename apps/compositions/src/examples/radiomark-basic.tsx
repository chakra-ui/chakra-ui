import { Radiomark, Stack } from "@chakra-ui/react"

export const RadiomarkBasic = () => {
  return (
    <Stack>
      <Radiomark />
      <Radiomark checked />
      <Radiomark disabled />
      <Radiomark checked disabled />
    </Stack>
  )
}
