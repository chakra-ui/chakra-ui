"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  createRecipeContext,
} from "../../styled-system"
import { cx, isString, omit } from "../../utils"

const { useRecipeResult, PropsProvider } = createRecipeContext({
  key: "separator",
})

export interface SeparatorBaseProps
  extends RecipeProps<"separator">,
    UnstyledProp {}

export interface SeparatorProps
  extends HTMLChakraProps<"span", SeparatorBaseProps> {}

export const Separator = forwardRef<HTMLSpanElement, SeparatorProps>(
  function Separator(props, ref) {
    const { styles, className, props: otherProps } = useRecipeResult(props)
    const orientation = props.orientation || "horizontal"
    return (
      <chakra.span
        ref={ref}
        role={isString(orientation) ? "separator" : "presentation"}
        aria-orientation={isString(orientation) ? orientation : undefined}
        {...omit(otherProps, ["orientation"])}
        className={cx(className, props.className)}
        css={[styles, props.css]}
      />
    )
  },
)

export const SeparatorPropsProvider =
  PropsProvider as React.Provider<SeparatorBaseProps>
