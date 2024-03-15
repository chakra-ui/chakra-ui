import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"
import { UseSliderReturn } from "./use-slider"

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
