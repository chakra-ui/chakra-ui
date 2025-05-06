import { Radiomark, Stack } from "@sh3yk0-ui/react"

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
