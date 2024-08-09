import { Box } from "../src"

export default {
  title: "Components / Slider",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { SliderBasic as Basic } from "compositions/examples/slider-basic"
export { SliderChangeEnd as ChangeEnd } from "compositions/examples/slider-change-end"
export { SliderControlled as Controlled } from "compositions/examples/slider-controlled"
export { SliderDisabled as Disabled } from "compositions/examples/slider-disabled"
export { SliderSizeTable as Sizes } from "compositions/examples/slider-size-table"
export { SliderThumbContained as ThumbContained } from "compositions/examples/slider-thumb-contained"
export { SliderVariantTable as Variants } from "compositions/examples/slider-variant-table"
export { SliderVertical as Vertical } from "compositions/examples/slider-vertical"
export { SliderWithColors as WithColors } from "compositions/examples/slider-with-colors"
export { SliderWithLabel as WithLabel } from "compositions/examples/slider-with-label"
export { SliderWithMarks as WithMarks } from "compositions/examples/slider-with-marks"
export { SliderWithMultipleThumbs as RangeSlider } from "compositions/examples/slider-with-multiple-thumbs"
export { SliderWithStep as WithStep } from "compositions/examples/slider-with-step"
