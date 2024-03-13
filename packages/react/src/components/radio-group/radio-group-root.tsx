import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipePropsProvider,
  SlotRecipeProps,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { RadioGroupContextProvider } from "./radio-group-context"
import { splitRadioGroupProps } from "./radio-group-props"
import { UseRadioGroupProps, useRadioGroup } from "./use-radio-group"

export interface RadioGroupRootProps
  extends HTMLChakraProps<"div", UseRadioGroupProps>,
    SlotRecipeProps<"Radio"> {}

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chakra-ui.com/radio
 */
export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>(
  function RadioGroupRoot(props, ref) {
    const recipe = useSlotRecipe("Radio")
    const [variantProps, restProps] = recipe.splitVariantProps(props)
    const [groupProps, localProps] = splitRadioGroupProps(restProps)

    const api = useRadioGroup(groupProps)

    return (
      <RecipePropsProvider value={variantProps}>
        <RadioGroupContextProvider value={api}>
          <chakra.div
            {...api.getRootProps(localProps, ref)}
            className={cx("chakra-radio-group", localProps.className)}
          />
        </RadioGroupContextProvider>
      </RecipePropsProvider>
    )
  },
)

RadioGroupRoot.displayName = "RadioGroupRoot"
