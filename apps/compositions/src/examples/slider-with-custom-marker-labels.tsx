import { Slider } from "@chakra-ui/react"

const marks = [
  { value: 20, label: "Low", color: "green.fg" },
  { value: 50, label: "Medium", color: "orange.fg" },
  { value: 80, label: "High", color: "red.fg" },
]

export const SliderWithCustomMarkerLabels = () => {
  return (
    <Slider.Root width="xs" defaultValue={[50]}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
        <Slider.MarkerGroup>
          {marks.map((mark) => (
            <Slider.Marker key={mark.value} value={mark.value}>
              <Slider.MarkerIndicator />
              <Slider.MarkerLabel color={mark.color} fontWeight="medium">
                {mark.label}
              </Slider.MarkerLabel>
            </Slider.Marker>
          ))}
        </Slider.MarkerGroup>
      </Slider.Control>
    </Slider.Root>
  )
}
