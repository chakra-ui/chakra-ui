import { Dict, isString } from "@chakra-ui/utils"
import * as React from "react"
import { useChakra } from "../color-mode"
import css from "../css"
import { forwardRef, memo } from "../forward-ref"
import { jsx } from "../system"
import {
  getDisplayName,
  evalShouldForwardProp,
  runIfFn,
  filterStylePropNames,
  filterProps,
} from "./create-chakra.utils"
import getComponentStyles from "./get-component-style"
import { As, CreateChakraComponent, CreateChakraOptions } from "./types"

export function styled<T extends As, P = {}>(
  component: T,
  options?: CreateChakraOptions<P>,
) {
  return function(...interpolations: any[]) {
    const Styled = forwardRef(({ as, ...props }: any, ref: React.Ref<any>) => {
      // Get the color mode and theme from context
      const { colorMode, theme } = useChakra()

      // Stores the the final styles
      let computedStyles: Dict = {}

      // For each style interpolation, we'll pass the theme and colorMode
      const propsWithTheme = { theme, colorMode, ...props }

      // Users can pass a base style to the component, let's resolve it
      if (options?.baseStyle) {
        const baseStyleObject = runIfFn(options.baseStyle, propsWithTheme)
        const baseStyle = css(baseStyleObject)(theme)
        computedStyles = { ...computedStyles, ...baseStyle }
      }

      // Resolve each interpolation and add result to final style
      interpolations.forEach(interpolation => {
        const style = runIfFn(interpolation, propsWithTheme)
        computedStyles = { ...computedStyles, ...style }
      })

      // Get the component style from theme.components
      const componentStyles = getComponentStyles(propsWithTheme, options)

      // Add final styles before component styles to support prop overriding
      computedStyles = { ...componentStyles, ...computedStyles }

      const element = as || component
      const isTag = isString(element)
      let computedProps: Dict = isTag ? {} : { ...props }

      // The gatekeeper that prevents style props from getting to the dom
      if (isTag) computedProps = filterProps(props)

      // anyone style props that made it through here will get cleaned up
      computedProps = filterStylePropNames(computedProps)

      // If user passed should forward prop, evaluate it.
      if (options?.shouldForwardProp) {
        computedProps = evalShouldForwardProp(
          options.shouldForwardProp,
          computedProps,
        )
      }

      // Attach props to this component
      if (options?.attrs) {
        const attrsProps = runIfFn(options.attrs, computedProps)
        computedProps = { ...computedProps, ...attrsProps }
      }

      return jsx(element, {
        ref,
        ...computedProps,
        css: computedStyles,
      })
    })

    //@ts-ignore
    Styled.displayName = `CreateChakra(${getDisplayName(component)})`

    const Component = options?.pure ? memo(Styled) : Styled

    return Component as CreateChakraComponent<T, P>
  }
}

export default styled
