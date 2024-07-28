"use client"

import { Slider } from "compositions/ui/slider"
import { useState } from "react"

export const SliderControlled = () => {
  const [value, setValue] = useState([40])
  return (
    <Slider
      maxW="200px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    />
  )
}
