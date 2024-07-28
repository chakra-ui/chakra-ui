import { Slider } from "compositions/ui/slider"

export const SliderWithMarks = () => {
  return <Slider width="200px" defaultValue={[40]} marks={[0, 50, 100]} />
}
