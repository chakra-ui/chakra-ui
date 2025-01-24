import { forwardRef } from "react"
import type { RecipeProps } from "../../styled-system"
import { useRecipe } from "../../styled-system"
import { Group, type GroupProps } from "../group"
import { ButtonPropsProvider } from "./button"

export interface ButtonGroupProps extends GroupProps, RecipeProps<"button"> {}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(props, ref) {
    const recipe = useRecipe({ key: "button" })
    const [variantProps, otherProps] = recipe.splitVariantProps(props)
    return (
      <ButtonPropsProvider value={variantProps}>
        <Group ref={ref} {...otherProps} />
      </ButtonPropsProvider>
    )
  },
)
