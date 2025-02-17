"use client"

import { Group, PinInput } from "@chakra-ui/react"
import { useState } from "react"

export const PinInputControlled = () => {
  const [value, setValue] = useState(["", "", "", ""])
  return (
    <PinInput.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <PinInput.HiddenInput />
      <PinInput.Control>
        <Group>
          {Array.from({ length: 4 }).map((_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </Group>
      </PinInput.Control>
    </PinInput.Root>
  )
}
