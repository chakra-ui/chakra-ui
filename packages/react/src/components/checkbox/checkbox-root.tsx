"use client"

import { callAll, cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
  chakra,
  mergeProps,
  useParentRecipeProps,
  useSlotRecipe,
} from "../../styled-system"
import {
  CheckboxContextProvider,
  CheckboxStylesProvider,
  useCheckboxGroupContext,
} from "./checkbox-context"
import { splitCheckboxProps } from "./checkbox-props"
import { UseCheckboxProps } from "./checkbox-types"
import { useCheckbox } from "./use-checkbox"

export interface CheckboxRootProps
  extends HTMLChakraProps<"label", UseCheckboxProps>,
    SlotRecipeProps<"Checkbox">,
    UnstyledProp {
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const CheckboxRoot = forwardRef<HTMLInputElement, CheckboxRootProps>(
  function Checkbox({ unstyled, ...props }, ref) {
    const parentVariantProps = useParentRecipeProps()

    const recipe = useSlotRecipe("Checkbox", props.recipe)
    const [variantProps, ownProps] = recipe.splitVariantProps(props)
    const _variantProps = mergeProps<any>(parentVariantProps, variantProps)

    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(_variantProps)

    const group = useCheckboxGroupContext()

    if (group?.value && ownProps.value) {
      ownProps.checked = group.value.includes(ownProps.value)
    }

    if (group?.onChange && ownProps.value) {
      ownProps.onChange = callAll(group.onChange, ownProps.onChange)
    }

    if (group?.disabled && ownProps.disabled == null) {
      ownProps.disabled = group.disabled
    }

    const [checkboxProps, localProps] = splitCheckboxProps(ownProps)
    const api = useCheckbox(checkboxProps)

    const { inputProps, ...elementProps } = localProps

    return (
      <CheckboxStylesProvider value={styles}>
        <CheckboxContextProvider value={api}>
          <chakra.label
            {...api.getRootProps(elementProps)}
            css={[styles.root, props.css]}
            className={cx("chakra-checkbox", props.className)}
          >
            <input
              {...api.getInputProps(inputProps, ref)}
              className="chakra-checkbox__input"
            />
            {props.children}
          </chakra.label>
        </CheckboxContextProvider>
      </CheckboxStylesProvider>
    )
  },
)

CheckboxRoot.displayName = "Checkbox"
