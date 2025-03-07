import { HStack, Slider } from "@chakra-ui/react"

export const SliderWithValueText = () => {
  return (
    <Slider.Root maxW="sm" size="sm" defaultValue={[40]}>
      <HStack justify="space-between">
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
      </HStack>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs rounded="l1" />
      </Slider.Control>
    </Slider.Root>
  )
}
