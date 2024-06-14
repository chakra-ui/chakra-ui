"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_STYLES,
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"
import { FieldContextProvider } from "./field-context"
import { splitFieldProps } from "./field-props"
import type { FieldContext } from "./types"
import { useFieldState } from "./use-field-state"

export interface FieldProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"field">,
    FieldContext,
    UnstyledProp {}

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { unstyled, ...props },
  ref,
) {
  const recipe = useRecipe("field", props.recipe)
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

  const [formControlProps, rootProps] = splitFieldProps(localProps)
  const fieldState = useFieldState(formControlProps)

  return (
    <FieldContextProvider value={fieldState}>
      <chakra.div
        {...fieldState.getRootProps(rootProps, ref)}
        className={cx("chakra-field", props.className)}
        css={[styles, props.css]}
      />
    </FieldContextProvider>
  )
})
