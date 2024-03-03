import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { UseRangeSliderReturn } from "./use-range-slider"
import { UseSliderReturn } from "./use-slider"

interface RangeSliderContext extends UseRangeSliderReturn {
  name?: string | string[]
}

export const [RangeSliderProvider, useRangeSliderContext] =
  createContext<RangeSliderContext>({
    name: "SliderContext",
    errorMessage:
      "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <RangeSlider />",
  })

export const [RangeSliderStylesProvider, useRangeSliderStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `RangeSliderStylesContext`,
  errorMessage: `useRangeSliderStyles returned is 'undefined'. Seems you forgot to wrap the components in "<RangeSlider />" `,
})

interface SliderContext
  extends Omit<UseSliderReturn, "getInputProps" | "getRootProps"> {}

export const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  name: "SliderContext",
  hookName: "useSliderContext",
  providerName: "<Slider />",
})

export const [SliderStylesProvider, useSliderStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `SliderStylesContext`,
  hookName: `useSliderStyles`,
  providerName: "<Slider />",
})
