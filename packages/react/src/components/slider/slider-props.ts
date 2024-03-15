import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseSliderProps } from "./use-slider"

const sliderProps = createProps<UseSliderProps>()([
  "aria-label",
  "aria-labelledby",
  "aria-valuetext",
  "defaultValue",
  "direction",
  "focusThumbOnChange",
  "getAriaValueText",
  "id",
  "disabled",
  "readOnly",
  "isReversed",
  "max",
  "min",
  "name",
  "onChange",
  "onChangeEnd",
  "onChangeStart",
  "orientation",
  "step",
  "value",
])

export const splitSliderProps = createSplitProps<UseSliderProps>(sliderProps)
