"use client"

import * as React from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  chakra,
  createRecipeContext,
} from "../../styled-system"
import { cx } from "../../utils"

const { useRecipeResult, PropsProvider } = createRecipeContext({ key: "icon" })

export interface IconProps
  extends HTMLChakraProps<"svg">,
    RecipeProps<"icon"> {}

/**
 * The Icon component renders as an svg element to help define your own custom components.
 *
 * @see Docs https://chakra-ui.com/docs/components/icon#using-the-icon-component
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  function Icon(props, ref) {
    const {
      styles,
      className,
      props: otherProps,
    } = useRecipeResult({ asChild: !props.as, ...props })
    return (
      <chakra.svg
        ref={ref}
        focusable={false}
        aria-hidden="true"
        {...otherProps}
        css={[styles, props.css]}
        className={cx(className, props.className)}
      />
    )
  },
)

export const IconPropsProvider = PropsProvider as React.Provider<IconProps>
