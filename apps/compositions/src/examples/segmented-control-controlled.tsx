"use client"

import { SegmentedControl } from "compositions/ui/segmented-control"
import { useState } from "react"

export const SegmentedControlControlled = () => {
  const [value, setValue] = useState("React")
  return (
    <SegmentedControl
      value={value}
      onValueChange={(e) => setValue(e.value)}
      items={["React", "Vue", "Solid"]}
    />
  )
}
