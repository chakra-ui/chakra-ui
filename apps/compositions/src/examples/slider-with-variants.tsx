import { Stack } from "@chakra-ui/react"
import { Slider } from "compositions/ui/slider"

export const SliderWithVariants = () => {
  return (
    <Stack width="200px" gap="4">
      <Slider defaultValue={[40]} variant="outline" label="slider - outline" />
      <Slider defaultValue={[40]} variant="solid" label="slider - solid" />
    </Stack>
  )
}
