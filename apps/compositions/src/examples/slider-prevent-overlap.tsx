import { Slider } from "@chakra-ui/react"

export const SliderPreventOverlap = () => {
  return (
    <Slider.Root maxW="md" defaultValue={[20, 60]} minStepsBetweenThumbs={8}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  )
}
