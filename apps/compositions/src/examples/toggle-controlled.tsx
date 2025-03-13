"use client"

import { Button, Code, Stack, Toggle } from "@chakra-ui/react"
import { useState } from "react"

export const ToggleControlled = () => {
  const [pressed, setPressed] = useState(false)

  return (
    <Stack align="flex-start">
      <Toggle.Root asChild pressed={pressed} onPressedChange={setPressed}>
        <Button variant={{ base: "subtle", _pressed: "solid" }}>Pressed</Button>
      </Toggle.Root>

      <Code size="sm" fontWeight="medium">
        Pressed: {pressed ? "true" : "false"}
      </Code>
    </Stack>
  )
}
