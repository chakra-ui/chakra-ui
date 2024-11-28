import { Slider } from "compositions/ui/slider"

export const SliderWithMarksVertical = () => {
  return (
    <Slider
      height="200px"
      orientation="vertical"
      colorPalette="pink"
      defaultValue={[40]}
      marks={[
        { value: 0, label: "0%" },
        { value: 50, label: "50%" },
        { value: 100, label: "100%" },
      ]}
    />
  )
}
