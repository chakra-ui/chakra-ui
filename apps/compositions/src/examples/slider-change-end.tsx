"use client"

import { Box, Code, Stack } from "@chakra-ui/react"
import { Slider } from "compositions/ui/slider"
import { useState } from "react"

const initialValue = [50]

export const SliderChangeEnd = () => {
  const [value, setValue] = useState(initialValue)
  const [endValue, setEndValue] = useState(initialValue)

  return (
    <Box maxW="240px">
      <Slider
        value={value}
        onValueChange={(e) => setValue(e.value)}
        onValueChangeEnd={(e) => setEndValue(e.value)}
      />
      <Stack mt="3" gap="1">
        <Code>
          onChange: <b>{value}</b>
        </Code>
        <Code>
          onChangeEnd: <b>{endValue}</b>
        </Code>
      </Stack>
    </Box>
  )
}
