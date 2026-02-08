import { Slider, Stack, Text } from "@chakra-ui/react"

export const SliderWithCollisionBehavior = () => {
  return (
    <Stack gap="4" width="300px">
      <Slider.Root defaultValue={[30, 70]} thumbCollisionBehavior="push">
        <Slider.Label>Price Range</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
      <Text color="fg.muted" textStyle="sm">
        Try dragging the thumbs together to see them push each other
      </Text>
    </Stack>
  )
}
