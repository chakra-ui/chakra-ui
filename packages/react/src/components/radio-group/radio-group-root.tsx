import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import {
  RadioGroupContextProvider,
  RadioThemingContextProvider,
} from "./radio-group-context"
import { splitRadioGroupProps } from "./radio-group-props"
import { UseRadioGroupProps, useRadioGroup } from "./use-radio-group"

type Omitted =
  | "onChange"
  | "value"
  | "defaultValue"
  | "defaultChecked"
  | "children"

export interface RadioGroupRootProps
  extends UseRadioGroupProps,
    Omit<HTMLChakraProps<"div">, Omitted>,
    Omit<SystemRecipeProps<"Radio">, "orientation"> {}

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chakra-ui.com/radio
 */
export const RadioGroupRoot = forwardRef<RadioGroupRootProps, "div">(
  function RadioGroupRoot(props, ref) {
    const recipe = useSlotRecipe("Radio")

    const [variantProps, restProps] = recipe.splitVariantProps(props)
    const [groupProps, localProps] = splitRadioGroupProps(restProps)

    const api = useRadioGroup(groupProps)

    return (
      <RadioThemingContextProvider value={variantProps}>
        <RadioGroupContextProvider value={api}>
          <chakra.div
            {...api.getRootProps(localProps, ref)}
            className={cx("chakra-radio-group", localProps.className)}
          />
        </RadioGroupContextProvider>
      </RadioThemingContextProvider>
    )
  },
)

RadioGroupRoot.displayName = "RadioGroupRoot"
