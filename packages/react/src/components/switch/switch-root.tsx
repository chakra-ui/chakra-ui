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
import { UseCheckboxProps, useCheckbox } from "../checkbox"
import { splitCheckboxProps } from "../checkbox/checkbox-props"
import { SwitchContextProvider, SwitchStylesProvider } from "./switch-context"

export interface SwitchRootProps
  extends HTMLChakraProps<"label", UseCheckboxProps>,
    UnstyledProp,
    SlotRecipeProps<"Switch"> {}

/**
 * The `Switch` component is used as an alternative for the checkbox component for switching between "enabled" and "disabled" states.
 *
 * @see Docs https://chakra-ui.com/docs/components/switch
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 */
export const SwitchRoot = forwardRef<HTMLInputElement, SwitchRootProps>(
  function SwitchRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Switch", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const [checkboxProps, elementProps] = splitCheckboxProps(localProps)
    const api = useCheckbox(checkboxProps)

    return (
      <SwitchStylesProvider value={styles}>
        <SwitchContextProvider value={api}>
          <chakra.label
            {...api.getRootProps(elementProps)}
            className={cx("chakra-switch", props.className)}
            css={[styles.root, props.css]}
          >
            <input
              className="chakra-switch__input"
              {...api.getInputProps({}, ref)}
            />
            {localProps.children}
          </chakra.label>
        </SwitchContextProvider>
      </SwitchStylesProvider>
    )
  },
)

SwitchRoot.displayName = "SwitchRoot"
