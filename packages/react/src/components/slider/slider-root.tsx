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
import { SliderProvider, SliderStylesProvider } from "./slider-context"
import { splitSliderProps } from "./slider-props"
import { UseSliderProps, useSlider } from "./use-slider"

export interface SliderRootProps
  extends SlotRecipeProps<"Slider">,
    HTMLChakraProps<"div", UseSliderProps>,
    UnstyledProp {}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/slider/
 */
export const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>(
  function SliderRoot({ unstyled, ...props }, ref) {
    const sliderProps: SliderRootProps = {
      ...props,
      orientation: props?.orientation ?? "horizontal",
    }

    const recipe = useSlotRecipe("Slider")
    const [variantProps, localProps] = recipe.splitVariantProps(sliderProps)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const [hookProps, elementProps] = splitSliderProps(localProps)
    hookProps.orientation = sliderProps.orientation

    const api = useSlider(hookProps)

    return (
      <SliderProvider value={api}>
        <SliderStylesProvider value={styles}>
          <chakra.div
            {...api.getRootProps(elementProps)}
            className={cx("chakra-slider", sliderProps.className)}
            css={[styles.root, sliderProps.css]}
          >
            {sliderProps.children}
            <input {...api.getInputProps({}, ref)} />
          </chakra.div>
        </SliderStylesProvider>
      </SliderProvider>
    )
  },
)

SliderRoot.displayName = "SliderRoot"
