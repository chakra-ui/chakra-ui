"use client"

import { forwardRef, useMemo } from "react"
import type { RecipeProps } from "../../styled-system/index.ts"
import { useRecipe } from "../../styled-system/index.ts"
import { Group, type GroupProps } from "../group/index.ts"
import { ButtonPropsProvider } from "./button.tsx"

export interface ButtonGroupProps extends GroupProps, RecipeProps<"button"> {}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(props, ref) {
    const recipe = useRecipe({ key: "button" })
    const [variantProps, otherProps] = useMemo(
      () => recipe.splitVariantProps(props),
      [props, recipe],
    )
    return (
      <ButtonPropsProvider value={variantProps}>
        <Group ref={ref} {...otherProps} />
      </ButtonPropsProvider>
    )
  },
)

ButtonGroup.displayName = "ButtonGroup"
