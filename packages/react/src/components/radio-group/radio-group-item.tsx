import { callAll } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import {
  RadioItemContextProvider,
  RadioItemStylesProvider,
  useRadioGroupContext,
} from "./radio-group-context"
import { splitRadioItemProps } from "./radio-group-props"
import { UseRadioProps, useRadio } from "./use-radio"

export interface RadioGroupItemProps
  extends HTMLChakraProps<"label", UseRadioProps>,
    SystemRecipeProps<"Radio"> {
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const RadioGroupItem = forwardRef<RadioGroupItemProps, "input">(
  function RadioGroupItem(props, ref) {
    const api = useRadioGroupContext()
    const recipe = useSlotRecipe("Radio")

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const { children, inputProps, ...restProps } = localProps

    const [itemProps, rootProps] = splitRadioItemProps(restProps)

    // assign properties from the radio group to the radio item

    if (api?.value != null && itemProps.value != null) {
      itemProps.isChecked = api.value === itemProps.value
    }

    if (api?.onChange && itemProps.value != null) {
      itemProps.onChange = callAll(api.onChange, itemProps.onChange)
    }

    if (api?.name) {
      itemProps.name = api.name
    }

    if (api?.isDisabled) {
      itemProps.isDisabled = api.isDisabled
    }

    if (api?.isFocusable) {
      itemProps.isFocusable = api.isFocusable
    }

    const itemApi = useRadio(itemProps)

    return (
      <RadioItemStylesProvider value={styles}>
        <RadioItemContextProvider value={itemApi}>
          <chakra.label
            className="chakra-radio"
            {...rootProps}
            css={styles.root}
          >
            <input
              className="chakra-radio__input"
              {...(itemApi.getInputProps(inputProps, ref) as any)}
            />
            {children}
          </chakra.label>
        </RadioItemContextProvider>
      </RadioItemStylesProvider>
    )
  },
)

RadioGroupItem.displayName = "RadioGroupItem"
