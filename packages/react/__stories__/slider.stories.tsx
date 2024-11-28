import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Slider",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SliderBasic as Basic } from "compositions/examples/slider-basic"
export { SliderChangeEnd as ChangeEnd } from "compositions/examples/slider-change-end"
export { SliderControlled as Controlled } from "compositions/examples/slider-controlled"
export { SliderDisabled as Disabled } from "compositions/examples/slider-disabled"
export { SliderSizeTable as Sizes } from "compositions/examples/slider-size-table"
export { SliderThumbContained as ThumbContained } from "compositions/examples/slider-thumb-contained"
export { SliderVariantTable as Variants } from "compositions/examples/slider-variant-table"
export { SliderVertical as Vertical } from "compositions/examples/slider-vertical"
export { SliderWithColors as Colors } from "compositions/examples/slider-with-colors"
export { SliderWithHookForm as HookForm } from "compositions/examples/slider-with-hook-form"
export { SliderWithLabel as Label } from "compositions/examples/slider-with-label"
export { SliderWithMarks as Marks } from "compositions/examples/slider-with-marks"
export { SliderWithMarksAndLabel as MarksAndLabel } from "compositions/examples/slider-with-marks-and-label"
export { SliderWithMarksVertical as MarksVertical } from "compositions/examples/slider-with-marks-vertical"
export { SliderWithMultipleThumbs as RangeSlider } from "compositions/examples/slider-with-multiple-thumbs"
export { SliderWithStep as Step } from "compositions/examples/slider-with-step"
export { SliderWithStore as Store } from "compositions/examples/slider-with-store"
