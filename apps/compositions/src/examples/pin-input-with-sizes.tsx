import { Stack } from "@chakra-ui/react"
import { PinInput } from "compositions/ui/pin-input"

export const PinInputWithSizes = () => {
  return (
    <Stack gap="4">
      <PinInput size="sm" />
      <PinInput size="md" />
      <PinInput size="lg" />
    </Stack>
  )
}
