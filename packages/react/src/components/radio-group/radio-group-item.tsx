"use client"

import { callAll, cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, SlotRecipeProps, chakra } from "../../styled-system"
import {
  RadioItemContextProvider,
  useRadioGroupContext,
  useRadioGroupStyles,
} from "./radio-group-context"
import { splitRadioItemProps } from "./radio-group-props"
import { UseRadioProps, useRadio } from "./use-radio"

export interface RadioGroupItemProps
  extends HTMLChakraProps<"label", UseRadioProps>,
    SlotRecipeProps<"Radio"> {
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  function RadioGroupItem(props, ref) {
    const api = useRadioGroupContext()
    const styles = useRadioGroupStyles()

    const { children, inputProps, ...restProps } = props

    const [itemProps, rootProps] = splitRadioItemProps(restProps)

    // assign properties from the radio group to the radio item

    if (api?.value != null && itemProps.value != null) {
      itemProps.checked = api.value === itemProps.value
    }

    if (api?.onChange && itemProps.value != null) {
      itemProps.onChange = callAll(api.onChange, itemProps.onChange)
    }

    if (api?.name) {
      itemProps.name = api.name
    }

    if (api?.disabled) {
      itemProps.disabled = api.disabled
    }

    if (api?.focusable) {
      itemProps.focusable = api.focusable
    }

    const itemApi = useRadio(itemProps)

    return (
      <RadioItemContextProvider value={itemApi}>
        <chakra.label
          {...rootProps}
          className={cx("chakra-radio", rootProps.className)}
          css={[styles.item, props.css]}
        >
          <input
            className="chakra-radio__input"
            {...(itemApi.getInputProps(inputProps, ref) as any)}
          />
          {children}
        </chakra.label>
      </RadioItemContextProvider>
    )
  },
)

RadioGroupItem.displayName = "RadioGroupItem"
