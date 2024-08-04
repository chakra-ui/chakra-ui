"use client"

import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"
import { useState } from "react"

export const NumberInputControlled = () => {
  const [value, setValue] = useState("10")
  return (
    <NumberInputRoot
      maxW="200px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <NumberInputField />
    </NumberInputRoot>
  )
}
