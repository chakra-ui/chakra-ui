import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { callAll } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import {
  RadioItemContextProvider,
  RadioItemStylesProvider,
  useRadioGroupContext,
} from "./radio-group-context"
import { splitRadioItemProps } from "./radio-group-props"
import { UseRadioProps, useRadio } from "./use-radio"

export interface RadioGroupItemProps
  extends UseRadioProps,
    Omit<HTMLChakraProps<"label">, keyof UseRadioProps>,
    ThemingProps<"Radio"> {
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const RadioGroupItem = forwardRef<RadioGroupItemProps, "input">(
  function RadioGroupItem(props, ref) {
    const ownProps = omitThemingProps(props)

    const api = useRadioGroupContext()
    const styles = useMultiStyleConfig("Radio", { ...api, ...props })

    const { children, inputProps, ...restProps } = ownProps

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
      <chakra.label className="chakra-radio" {...rootProps} __css={styles.root}>
        <input
          className="chakra-radio__input"
          {...itemApi.getInputProps(inputProps, ref)}
        />
        <RadioItemStylesProvider value={styles}>
          <RadioItemContextProvider value={itemApi}>
            {children}
          </RadioItemContextProvider>
        </RadioItemStylesProvider>
      </chakra.label>
    )
  },
)

RadioGroupItem.displayName = "RadioGroupItem"
