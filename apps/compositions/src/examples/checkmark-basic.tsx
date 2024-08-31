import { Checkmark, Stack } from "@chakra-ui/react"

export const CheckmarkBasic = () => {
  return (
    <Stack colorPalette="accent">
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
      <Checkmark disabled />
      <Checkmark checked disabled />
      <Checkmark indeterminate disabled />
    </Stack>
  )
}
