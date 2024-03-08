import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import {
  RangeSliderProvider,
  RangeSliderStylesProvider,
} from "./range-slider-context"
import { UseRangeSliderProps, useRangeSlider } from "./use-range-slider"

export interface RangeSliderRootProps
  extends UseRangeSliderProps,
    SlotRecipeProps<"Slider">,
    Omit<HTMLChakraProps<"div">, keyof UseRangeSliderProps> {}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/
 */
export const RangeSliderRoot = forwardRef<RangeSliderRootProps, "div">(
  function RangeSlider(props, ref) {
    const sliderProps: RangeSliderRootProps = {
      orientation: "horizontal",
      ...props,
    }

    const recipe = useSlotRecipe("Slider")
    const [variantProps, localProps] = recipe.splitVariantProps(sliderProps)
    const styles = recipe(variantProps)

    const api = useRangeSlider(localProps)
    const context = { ...api, name: localProps.name }

    return (
      <RangeSliderProvider value={context}>
        <RangeSliderStylesProvider value={styles}>
          <chakra.div
            {...api.getRootProps({}, ref)}
            className="chakra-slider"
            css={styles.root}
          >
            {sliderProps.children}
          </chakra.div>
        </RangeSliderStylesProvider>
      </RangeSliderProvider>
    )
  },
)

RangeSliderRoot.displayName = "RangeSliderRoot"
