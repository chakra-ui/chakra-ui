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
  RadioGroupContextProvider,
  RadioGroupStylesProvider,
} from "./radio-group-context"
import { splitRadioGroupProps } from "./radio-group-props"
import { UseRadioGroupProps, useRadioGroup } from "./use-radio-group"

export interface RadioGroupRootProps
  extends HTMLChakraProps<"div", UseRadioGroupProps>,
    SlotRecipeProps<"Radio">,
    UnstyledProp {}

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chakra-ui.com/radio
 */
export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>(
  function RadioGroupRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Radio")
    const [variantProps, restProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const [groupProps, localProps] = splitRadioGroupProps(restProps)
    const api = useRadioGroup(groupProps)

    return (
      <RadioGroupStylesProvider value={styles}>
        <RadioGroupContextProvider value={api}>
          <chakra.div
            {...api.getRootProps(localProps, ref)}
            css={[styles.root, props.css]}
            className={cx("chakra-radio-group", localProps.className)}
          />
        </RadioGroupContextProvider>
      </RadioGroupStylesProvider>
    )
  },
)

RadioGroupRoot.displayName = "RadioGroupRoot"
