"use client"

import { HStack } from "@chakra-ui/react"
import { Radio, RadioGroup } from "compositions/ui/radio"
import { useState } from "react"

export const RadioControlled = () => {
  const [value, setValue] = useState("1")
  return (
    <RadioGroup value={value} onValueChange={(e) => setValue(e.value)}>
      <HStack gap="6">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </HStack>
    </RadioGroup>
  )
}
