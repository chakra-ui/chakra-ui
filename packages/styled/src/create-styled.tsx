import {
  Dict,
  isString,
  getDisplayName,
  isEmptyObject,
  runIfFn,
  As,
} from "@chakra-ui/utils"
import * as React from "react"
import { css, getComponentStyles, propNames } from "@chakra-ui/parser"
import jsx from "./jsx"
import { CSSObject, ThemeContext } from "@emotion/core"
import { StyledOptions, BaseTheme, ChakraComponent } from "./styled.types"

const stylePropNames = [...propNames, "variant", "size", "colorScheme"]

function createStyled<C extends As, T extends BaseTheme = BaseTheme>(
  component: C,
  options?: StyledOptions<T>,
) {
  return function(...interpolations: any[]) {
    //
    const Styled = React.forwardRef(
      ({ as, ...props }: any, ref: React.Ref<any>) => {
        // Get the color mode and theme from context
        const theme = React.useContext(ThemeContext)

        // Stores the the final styles
        let computedStyles: CSSObject = {}

        // For each style interpolation, we'll pass the theme and colorMode
        const propsWithTheme = { theme, ...props }

        // Users can pass a base style to the component, let's resolve it
        if (options?.baseStyle) {
          const baseStyleObject = runIfFn(options.baseStyle, propsWithTheme)
          const baseStyle = css(baseStyleObject)(theme)
          computedStyles = { ...computedStyles, ...baseStyle }
        }

        // Get the component style from theme.components
        if (options?.themeKey) {
          const componentStyles = getComponentStyles(
            propsWithTheme,
            options.themeKey as string,
          ) as CSSObject
          computedStyles = { ...computedStyles, ...componentStyles }
        }

        // Resolve each interpolation and add result to final style
        interpolations.forEach(interpolation => {
          const style = runIfFn(interpolation, propsWithTheme)
          computedStyles = { ...computedStyles, ...style }
        })

        const element = as || component
        const isTag = isString(element)

        let computedProps: Dict = { ...props }

        // Attach props to this component
        if (options?.attrs) {
          const attrsProps = runIfFn(options.attrs, propsWithTheme)
          computedProps = { ...computedProps, ...attrsProps }
        }

        for (const propName in computedProps) {
          if (stylePropNames.includes(propName)) {
            delete computedProps[propName]
          }
        }

        computedProps.style = {
          ...props?.style,
          ...options?.attrs?.style,
        }

        return jsx(element, {
          ref,
          ...computedProps,
          ...(!isEmptyObject(computedStyles) && { css: computedStyles }),
        })
      },
    )

    //@ts-ignore
    Styled.displayName = `styled.(${getDisplayName(component)})`

    const Component = options?.pure ? React.memo(Styled) : Styled

    return Component as ChakraComponent<C, T, StyledOptions<T>>
  }
}

export default createStyled
