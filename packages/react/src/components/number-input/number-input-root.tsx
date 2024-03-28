"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import {
  NumberInputContextProvider,
  NumberInputStylesProvider,
} from "./number-input-context"
import { splitNumberInputProps } from "./number-input-props"
import { UseNumberInputProps, useNumberInput } from "./use-number-input"

export interface NumberInputRootProps
  extends SlotRecipeProps<"NumberInput">,
    HTMLChakraProps<"div", UseNumberInputProps> {}

/**
 * NumberInput
 *
 * React component that provides context and logic to all
 * number input sub-components.
 *
 * It renders a `div` by default.
 *
 * @see Docs http://chakra-ui.com/numberinput
 */
export const NumberInputRoot = forwardRef<HTMLDivElement, NumberInputRootProps>(
  function NumberInputRoot(props, ref) {
    const recipe = useSlotRecipe("NumberInput")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const [hookProps, rootProps] = splitNumberInputProps(localProps)
    const api = useNumberInput(hookProps)

    return (
      <NumberInputContextProvider value={api}>
        <NumberInputStylesProvider value={styles}>
          <chakra.div
            {...rootProps}
            ref={ref}
            className={cx("chakra-numberinput", props.className)}
            css={[styles.root, props.css]}
          />
        </NumberInputStylesProvider>
      </NumberInputContextProvider>
    )
  },
)

NumberInputRoot.displayName = "NumberInputRoot"
