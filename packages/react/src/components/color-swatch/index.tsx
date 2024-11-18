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

  if (items.length > 4) {
    throw new Error("ColorSwatchMix doesn't support more than 4 colors")
  }

  const isThreeColors = items.length === 3

  return (
    <ColorSwatch overflow="hidden" {...restProps} value="transparent">
      <Grid templateColumns="var(--swatch-size) var(--swatch-size)">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <ColorSwatch
              size="inherit"
              key={item}
              rounded="none"
              value={item}
              boxShadow="none"
              gridColumn={
                isThreeColors && isLast ? "span 2 / span 2" : undefined
              }
              width={isThreeColors && isLast ? "unset" : undefined}
            />
          )
        })}
      </Grid>
    </ColorSwatch>
  )
}
