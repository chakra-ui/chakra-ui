"use client"

import { Slider } from "@chakra-ui/react"
import { useState } from "react"

export const SliderControlled = () => {
  const [value, setValue] = useState([40])
  return (
    <Slider.Root
      maxW="200px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  )
}
