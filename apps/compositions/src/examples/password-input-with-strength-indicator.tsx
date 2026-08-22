"use client"

import { Stack } from "@chakra-ui/react"
import { type Options, passwordStrength } from "check-password-strength"
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "compositions/ui/password-input"
import { useMemo, useState } from "react"

const strengthOptions: Options<string> = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
]

export const PasswordInputWithStrengthIndicator = () => {
  const [password, setPassword] = useState("")

  const strength = useMemo(() => {
    if (!password) return 0
    const result = passwordStrength(password, strengthOptions)
    return result.id
  }, [password])

  return (
    <Stack maxW="300px" gap="3">
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="Enter your password"
      />
      <PasswordStrengthMeter value={strength} />
    </Stack>
  )
}
