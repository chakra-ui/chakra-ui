"use client"

import { PinInput } from "compositions/ui/pin-input"
import { useState } from "react"

export const PinInputControlled = () => {
  const [value, setValue] = useState(["", "", "", ""])
  return <PinInput value={value} onValueChange={(e) => setValue(e.value)} />
}
