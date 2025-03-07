import { Slider } from "@chakra-ui/react"

export const SliderWithStep = () => {
  return (
    <Slider.Root width="200px" defaultValue={[40]} step={10}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  )
}
