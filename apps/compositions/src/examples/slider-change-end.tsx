"use client"

import { Box, Code, Slider, Stack } from "@chakra-ui/react"
import { useState } from "react"

const initialValue = [50]

export const SliderChangeEnd = () => {
  const [value, setValue] = useState(initialValue)
  const [endValue, setEndValue] = useState(initialValue)

  return (
    <Box maxW="240px">
      <Slider.Root
        value={value}
        onValueChange={(e) => setValue(e.value)}
        onValueChangeEnd={(e) => setEndValue(e.value)}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

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
