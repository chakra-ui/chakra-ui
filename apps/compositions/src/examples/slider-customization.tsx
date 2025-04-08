"use client"

import { Box, Slider } from "@chakra-ui/react"
import { MdGraphicEq } from "react-icons/md"

export const SliderCustomization = () => {
  return (
    <Slider.Root defaultValue={[30]}>
      <Slider.Control>
        <Slider.Track bg="red.100">
          <Slider.Range bg="tomato" />
        </Slider.Track>
        <Slider.Thumb index={0} boxSize={6} borderColor="tomato" shadow="md">
          <Box color="tomato" as={MdGraphicEq} />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
