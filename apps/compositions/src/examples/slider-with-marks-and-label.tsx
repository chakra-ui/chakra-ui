import { Slider } from "compositions/ui/slider"

export const SliderWithMarksAndLabel = () => {
  return (
    <Slider
      size="md"
      width="200px"
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
