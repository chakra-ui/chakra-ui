import { Slider } from "@chakra-ui/react"

const marks = [
  { value: 0, label: "0%" },
  { value: 50, label: "50%" },
  { value: 100, label: "100%" },
]

export const SliderWithMarksVertical = () => {
  return (
    <Slider.Root
      height="200px"
      orientation="vertical"
      colorPalette="pink"
      defaultValue={[40]}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
        <Slider.Marks marks={marks} />
      </Slider.Control>
    </Slider.Root>
  )
}
