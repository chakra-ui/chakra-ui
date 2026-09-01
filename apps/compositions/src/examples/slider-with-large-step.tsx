import { HStack, Slider, Text } from "@chakra-ui/react"

export const SliderWithLargeStep = () => {
  return (
    <Slider.Root maxW="sm" defaultValue={[40]} step={1} largeStep={20}>
      <HStack justify="space-between">
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
      </HStack>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Text color="fg.muted" textStyle="xs">
        Hold Shift and press an arrow key, or use Page Up and Page Down, to
        change the value by 20.
      </Text>
    </Slider.Root>
  )
}
