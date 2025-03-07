import { Slider, Stack } from "@chakra-ui/react"

export const SliderWithThumbAlignment = () => {
  return (
    <Stack maxW="200px" gap="4">
      <Slider.Root
        thumbAlignment="contain"
        thumbSize={{ width: 16, height: 16 }}
        defaultValue={[40]}
      >
        <Slider.Label>Slider (contain)</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

      <Slider.Root thumbAlignment="center" defaultValue={[40]}>
        <Slider.Label>Slider (center)</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </Stack>
  )
}
