"use client"

import { Code, Stack } from "@chakra-ui/react"
import { Toggle } from "compositions/ui/toggle"
import { useState } from "react"

export const ToggleControlled = () => {
  const [pressed, setPressed] = useState(false)
  return (
    <Stack align="flex-start">
      <Toggle variant="solid" pressed={pressed} onPressedChange={setPressed}>
        Pressed
      </Toggle>
      <Code size="sm" fontWeight="medium">
        Pressed: {pressed ? "true" : "false"}
      </Code>
    </Stack>
  )
}
