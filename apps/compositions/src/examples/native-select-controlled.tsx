"use client"

import { NativeSelect } from "@chakra-ui/react"
import { useState } from "react"

export const NativeSelectControlled = () => {
  const [value, setValue] = useState("")
  return (
    <NativeSelect.Root size="sm" width="240px">
      <NativeSelect.Field
        placeholder="Select option"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}
