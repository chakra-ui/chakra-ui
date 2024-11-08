"use client"

import type { Assign } from "@ark-ui/react"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  createRecipeContext,
} from "../../styled-system"
import { cx } from "../../utils"
import { Grid } from "../grid"

const { withPropsProvider, useRecipeResult } = createRecipeContext({
  key: "colorSwatch",
})

export interface ColorSwatchBaseProps
  extends UnstyledProp,
    RecipeProps<"colorSwatch"> {
  value: string
}

export interface ColorSwatchProps
  extends Assign<HTMLChakraProps<"span">, ColorSwatchBaseProps> {}

export const ColorSwatch = forwardRef<HTMLSpanElement, ColorSwatchProps>(
  function ColorSwatch(props, ref) {
    const { value, ...restProps } = props
    const { styles, className, props: localProps } = useRecipeResult(restProps)
    return (
      <chakra.span
        {...localProps}
        ref={ref}
        data-value={value}
        css={[styles, { "--color": value }, props.css]}
        className={cx(className, props.className)}
      />
    )
  },
)

export const ColorSwatchPropsProvider = withPropsProvider<ColorSwatchProps>()

export interface ColorSwatchMixProps extends Omit<ColorSwatchProps, "value"> {
  items: string[]
}

export const ColorSwatchMix = (props: ColorSwatchMixProps) => {
  const { items, ...restProps } = props
  return (
    <ColorSwatch overflow="hidden" {...restProps} value="transparent">
      <Grid templateColumns="var(--swatch-size) var(--swatch-size)">
        {items.map((item) => (
          <ColorSwatch size="inherit" key={item} rounded="none" value={item} />
        ))}
      </Grid>
    </ColorSwatch>
  )
}
