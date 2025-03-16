"use client"

import { Switch } from "@chakra-ui/react"
import { useState } from "react"

export const SwitchControlled = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={(e) => setChecked(e.checked)}
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label />
    </Switch.Root>
  )
}
