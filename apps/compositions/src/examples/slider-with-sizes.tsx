import { Stack } from "@chakra-ui/react"
import { Slider } from "compositions/ui/slider"

export const SliderWithSizes = () => {
  return (
    <Stack width="200px" gap="4">
      <Slider defaultValue={[40]} size="sm" label="slider - sm" />
      <Slider defaultValue={[40]} size="md" label="slider - md" />
      <Slider defaultValue={[40]} size="lg" label="slider - lg" />
    </Stack>
  )
}
