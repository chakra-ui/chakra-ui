import { Slider } from "@chakra-ui/react"

export const SliderWithDraggingIndicator = () => {
  return (
    <Slider.Root maxW="200px" defaultValue={[40]}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.DraggingIndicator
            layerStyle="fill.solid"
            top="6"
            rounded="sm"
            px="1.5"
          >
            <Slider.ValueText />
          </Slider.DraggingIndicator>
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
