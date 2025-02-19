"use client"

import { RatingGroup } from "@chakra-ui/react"
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
      <RatingGroup.Control>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingGroup.Item key={index} index={index + 1}>
            <RatingGroup.ItemIndicator />
          </RatingGroup.Item>
        ))}
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}
