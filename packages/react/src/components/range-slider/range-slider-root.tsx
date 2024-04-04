"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import {
  RangeSliderProvider,
  RangeSliderStylesProvider,
} from "./range-slider-context"
import { UseRangeSliderProps, useRangeSlider } from "./use-range-slider"

export interface RangeSliderRootProps
  extends SlotRecipeProps<"Slider">,
    HTMLChakraProps<"div", UseRangeSliderProps>,
    UnstyledProp {}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/
 */
export const RangeSliderRoot = forwardRef<HTMLDivElement, RangeSliderRootProps>(
  function RangeSlider({ unstyled, ...props }, ref) {
    const sliderProps: RangeSliderRootProps = {
      orientation: "horizontal",
      ...props,
    }

    const recipe = useSlotRecipe("Slider")
    const [variantProps, localProps] = recipe.splitVariantProps(sliderProps)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const api = useRangeSlider(localProps)
    const context = { ...api, name: localProps.name }

    return (
      <RangeSliderProvider value={context}>
        <RangeSliderStylesProvider value={styles}>
          <chakra.div
            {...api.getRootProps({}, ref)}
            className={cx("chakra-slider", props.className)}
            css={[styles.root, props.css]}
          >
            {sliderProps.children}
          </chakra.div>
        </RangeSliderStylesProvider>
      </RangeSliderProvider>
    )
  },
)

RangeSliderRoot.displayName = "RangeSliderRoot"
