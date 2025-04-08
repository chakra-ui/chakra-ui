"use client"

import { SegmentGroup } from "@chakra-ui/react"
import { useState } from "react"

export const SegmentedControlControlled = () => {
  const [value, setValue] = useState<string | null>("React")
  return (
    <SegmentGroup.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["React", "Vue", "Solid"]} />
    </SegmentGroup.Root>
  )
}
