import { Stack } from "@chakra-ui/react"
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "compositions/ui/password-input"

export const PasswordInputWithStrengthIndicator = () => {
  return (
    <Stack maxW="300px">
      <PasswordInput />
      <PasswordStrengthMeter value={2} />
    </Stack>
  )
}
