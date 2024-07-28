"use client"

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"
import { useState } from "react"

export const SelectControlled = () => {
  const [value, setValue] = useState<string[]>([])
  return (
    <SelectRoot
      items={frameworks}
      width="320px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <SelectLabel>Select framework</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select movie" />
      </SelectTrigger>
      <SelectContent>
        {frameworks.map((movie) => (
          <SelectItem item={movie} key={movie.value}>
            {movie.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}

const frameworks = [
  { label: "React.js", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
]
