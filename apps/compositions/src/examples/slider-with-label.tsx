import { Slider } from "@chakra-ui/react"

export const SliderWithLabel = () => {
  return (
    <Slider.Root width="200px" defaultValue={[40]}>
      <Slider.Label>Quantity</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  )
}
