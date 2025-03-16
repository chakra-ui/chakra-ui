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
export { SliderCustomization as Customization } from "compositions/examples/slider-customization"
export { SliderDisabled as Disabled } from "compositions/examples/slider-disabled"
export { SliderPreventOverlap as PreventOverlap } from "compositions/examples/slider-prevent-overlap"
export { SliderSizeTable as Sizes } from "compositions/examples/slider-size-table"
export { SliderWithThumbAlignment as ThumbAlignment } from "compositions/examples/slider-with-thumb-alignment"
export { SliderVariantTable as Variants } from "compositions/examples/slider-variant-table"
export { SliderVertical as Vertical } from "compositions/examples/slider-vertical"
export { SliderWithColors as Colors } from "compositions/examples/slider-with-colors"
export { SliderWithDraggingIndicator as DraggingIndicator } from "compositions/examples/slider-with-dragging-indicator"
export { SliderWithHookForm as HookForm } from "compositions/examples/slider-with-hook-form"
export { SliderWithLabel as Label } from "compositions/examples/slider-with-label"
export { SliderWithMarks as Marks } from "compositions/examples/slider-with-marks"
export { SliderWithMarksAndLabel as MarksAndLabel } from "compositions/examples/slider-with-marks-and-label"
export { SliderWithMarksVertical as MarksVertical } from "compositions/examples/slider-with-marks-vertical"
export { SliderWithMultipleThumbs as RangeSlider } from "compositions/examples/slider-with-multiple-thumbs"
export { SliderWithStep as Step } from "compositions/examples/slider-with-step"
export { SliderWithStore as Store } from "compositions/examples/slider-with-store"
export { SliderWithValueText as ValueText } from "compositions/examples/slider-with-value-text"
