"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  RecipeProps,
  UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"
import { PinInputProvider, PinInputStylesProvider } from "./pin-input-context"
import { splitPinInputProps } from "./pin-input-props"
import { UsePinInputProps, usePinInput } from "./use-pin-input"

export interface PinInputRootProps
  extends HTMLChakraProps<"div", UsePinInputProps>,
    RecipeProps<"PinInput">,
    UnstyledProp {}

/**
 * The `PinInput` component is similar to the Input component, but is optimized for entering sequences of digits quickly.
 *
 * @see Docs https://chakra-ui.com/docs/components/pin-input
 */
export const PinInputRoot = forwardRef<HTMLDivElement, PinInputRootProps>(
  function PinInput({ unstyled, ...props }, ref) {
    const recipe = useRecipe("PinInput", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const [hookProps, restProps] = splitPinInputProps(localProps)
    const api = usePinInput(hookProps)

    return (
      <PinInputProvider value={api}>
        <PinInputStylesProvider value={styles}>
          <chakra.div
            ref={ref}
            {...restProps}
            className={cx("chakra-pin-input", props.className)}
          />
        </PinInputStylesProvider>
      </PinInputProvider>
    )
  },
)

PinInputRoot.displayName = "PinInputRoot"
