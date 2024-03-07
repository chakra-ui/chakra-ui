import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseRangeSliderProps } from "./use-range-slider"

const sliderProps = createProps<UseRangeSliderProps>()([
  "aria-label",
  "aria-labelledby",
  "aria-valuetext",
  "defaultValue",
  "direction",
  "focusThumbOnChange",
  "getAriaValueText",
  "id",
  "isDisabled",
  "isReadOnly",
  "isReversed",
  "max",
  "min",
  "minStepsBetweenThumbs",
  "name",
  "onChange",
  "onChangeEnd",
  "onChangeStart",
  "orientation",
  "step",
  "value",
])

export const splitSliderProps =
  createSplitProps<UseRangeSliderProps>(sliderProps)