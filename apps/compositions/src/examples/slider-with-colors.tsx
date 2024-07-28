import { Stack } from "@chakra-ui/react"
import { Slider } from "compositions/ui/slider"

export const SliderWithColors = () => {
  return (
    <Stack gap="4" align="flex-start">
      <Slider width="200px" colorPalette="gray" defaultValue={[40]} />
      <Slider width="200px" colorPalette="blue" defaultValue={[40]} />
      <Slider width="200px" colorPalette="red" defaultValue={[40]} />
      <Slider width="200px" colorPalette="green" defaultValue={[40]} />
      <Slider width="200px" colorPalette="pink" defaultValue={[40]} />
      <Slider width="200px" colorPalette="teal" defaultValue={[40]} />
      <Slider width="200px" colorPalette="purple" defaultValue={[40]} />
      <Slider width="200px" colorPalette="cyan" defaultValue={[40]} />
    </Stack>
  )
}
