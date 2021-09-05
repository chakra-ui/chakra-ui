import * as React from "react"
import { __DEV__ } from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/react-utils"

export interface MultiSliderContextValue {
  /**
   * The values of all thumbs in the slider context.
   */
  values: { [key: number]: number | undefined }
  /**
   * Function to update a thumb value in the multi thumb slider context.
   */
  setThumbValue: (thumbKey: number, value: number | undefined) => void
  /**
   * TrackReference
   */
  trackRef: React.RefObject<HTMLElement>
  /**
   * The minimum allowed value of the slider thumb. Cannot be greater than max.
   * @default 0
   */
  min: number
  /**
   * The maximum allowed value of the slider thumb. Cannot be less than min.
   * @default 100
   */
  max: number
  /**
   * The step in which increments/decrements have to be made
   * @default 1
   */
  step: number
  /**
   * orientation of the slider
   * @default "horizontal"
   */
  orientation: "horizontal" | "vertical"
  /**
   * If `true`, the value will be incremented or decremented in reverse.
   */
  isReversed: boolean
  /**
   * If `true`, the slider will be disabled
   */
  isDisabled: boolean
  /**
   * If `true`, the slider will be in `read-only` state
   */
  isReadOnly: boolean
}

export const [
  MultiSliderContextProvider,
  useMultiSliderContext,
] = createContext<MultiSliderContextValue>({
  name: "SliderContext",
  errorMessage:
    "useMultiSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <MultiSlider />",
})

export interface MultiSliderProviderProps
  extends Omit<
    MultiSliderContextValue,
    "values" | "setThumbValue" | "trackRef"
  > {}

export const MultiSliderProvider: React.FC<MultiSliderProviderProps> = ({
  children,
  ...props
}) => {
  const [values, setValues] = React.useState<MultiSliderContextValue["values"]>(
    {},
  )
  const setThumbValue = React.useCallback(
    (thumbKey: number, value: number | undefined) =>
      setValues({ ...values, [thumbKey]: value }),
    [values],
  )
  const trackRef = React.useRef<HTMLElement>(null)
  const contextValue = {
    ...props,
    orientation: props.orientation,
    values,
    setThumbValue,
    trackRef,
  }

  return (
    <MultiSliderContextProvider value={contextValue}>
      {children}
    </MultiSliderContextProvider>
  )
}
if (__DEV__) {
  MultiSliderProvider.displayName = "MultiSliderProvider"
}
