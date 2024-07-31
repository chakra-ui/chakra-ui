"use client"

import { Switch } from "compositions/ui/switch"
import { useState } from "react"

export const SwitchControlled = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Switch checked={checked} onCheckedChange={(e) => setChecked(e.checked)} />
  )
}
