"use client"

import { RatingGroup } from "@sh3yk0-ui/react"
import { useState } from "react"

export const RatingControlled = () => {
  const [value, setValue] = useState(3)
  return (
    <RatingGroup.Root
      count={5}
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}
