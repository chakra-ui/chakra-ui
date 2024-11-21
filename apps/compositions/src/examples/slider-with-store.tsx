"use client"

import { Code, Slider, Stack, useSlider } from "@chakra-ui/react"

export const SliderWithStore = () => {
  const slider = useSlider({
    defaultValue: [40],
    thumbAlignment: "center",
  })

  return (
    <Stack align="flex-start">
      <Code>current: {slider.value}</Code>
      <Slider.RootProvider value={slider} width="200px">
        <Slider.Label>Slider</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.RootProvider>
    </Stack>
  )
}
