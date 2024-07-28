import { Slider } from "compositions/ui/slider"

export const SliderWithStep = () => {
  return <Slider width="200px" defaultValue={[40]} step={10} />
}
