"use client"

import { HStack, RadioGroup } from "@chakra-ui/react"
import { useState } from "react"

export const RadioControlled = () => {
  const [value, setValue] = useState("1")
  return (
    <RadioGroup.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <HStack gap="6">
        <RadioGroup.Item value="1">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
        </RadioGroup.Item>

        <RadioGroup.Item value="2">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
        </RadioGroup.Item>

        <RadioGroup.Item value="3">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Option 3</RadioGroup.ItemText>
        </RadioGroup.Item>
      </HStack>
    </RadioGroup.Root>
  )
}
