"use client"

import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"
import { useState } from "react"

export const NativeSelectControlled = () => {
  const [value, setValue] = useState("")
  return (
    <NativeSelectRoot size="sm" width="240px">
      <NativeSelectField
        placeholder="Select option"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
      </NativeSelectField>
    </NativeSelectRoot>
  )
}
