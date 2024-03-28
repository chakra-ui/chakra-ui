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
import { FieldContextProvider, FieldStylesProvider } from "./field-context"
import { splitFieldProps } from "./field-props"
import { FieldContext } from "./types"
import { useFieldProvider } from "./use-field-provider"

export interface FieldRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"Field">,
    FieldContext,
    UnstyledProp {}

/**
 * FormControl provides context such as
 * `invalid`, `disabled`, and `required` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 *
 * @see Docs https://chakra-ui.com/docs/components/form-control
 */
export const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>(
  function FieldRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Field", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const [formControlProps, rootProps] = splitFieldProps(localProps)
    const api = useFieldProvider(formControlProps)

    return (
      <FieldContextProvider value={api}>
        <FieldStylesProvider value={styles}>
          <chakra.div
            {...api.getRootProps(rootProps, ref)}
            className={cx("chakra-form-control", props.className)}
            css={[styles.root, props.css]}
          />
        </FieldStylesProvider>
      </FieldContextProvider>
    )
  },
)

FieldRoot.displayName = "FormControl"
