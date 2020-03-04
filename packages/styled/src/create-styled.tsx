import {
  Dict,
  getDisplayName,
  isEmptyObject,
  runIfFn,
  As,
  isString,
} from "@chakra-ui/utils"
import * as React from "react"
import { css, getComponentStyles } from "@chakra-ui/parser"
import jsx from "./jsx"
import { CSSObject, ThemeContext } from "@emotion/core"
import {
  StyledOptions,
  BaseTheme,
  ChakraComponent,
  ChakraComponentV2,
} from "./styled.types"
import {
  filterProps,
  removeStyleProps,
  customShouldForwardProp,
} from "./should-forward-prop"

function createStyled<C extends As, T extends BaseTheme = BaseTheme>(
  component: C,
  options?: StyledOptions<T>,
) {
  return function(...interpolations: any[]) {
    const Styled = React.forwardRef(
      ({ as, ...props }: any, ref: React.Ref<any>) => {
        const theme = React.useContext(ThemeContext)

        let computedStyles: CSSObject = {}

        const propsWithTheme = { theme, ...props }

        if (options?.baseStyle) {
          const baseStyleObject = runIfFn(options.baseStyle, propsWithTheme)
          const baseStyle = css(baseStyleObject)(theme)
          computedStyles = { ...computedStyles, ...baseStyle }
        }

        if (options?.themeKey) {
          const componentStyles = getComponentStyles(
            propsWithTheme,
            options.themeKey as string,
          )
          computedStyles = { ...computedStyles, ...componentStyles }
        }

        interpolations.forEach(interpolation => {
          const style = runIfFn(interpolation, propsWithTheme)
          computedStyles = { ...computedStyles, ...style }
        })

        const element = as || component
        const isTag = isString(element)

        let computedProps: Dict = isTag ? filterProps(props) : { ...props }

        if (options?.attrs) {
          const attrsProps = runIfFn(options.attrs, propsWithTheme)
          computedProps = { ...computedProps, ...attrsProps }
        }

        if (!isTag) removeStyleProps(computedProps)

        computedProps.style = {
          ...props?.style,
          ...options?.attrs?.style,
        }

        // If user passed should forward prop, evaluate it.
        if (options?.shouldForwardProp) {
          computedProps = customShouldForwardProp(
            options.shouldForwardProp,
            computedProps,
          )
        }

        return jsx(element, {
          ref,
          ...computedProps,
          ...(!isEmptyObject(computedStyles) && { css: computedStyles }),
        })
      },
    )

    //@ts-ignore
    Styled.displayName = `chakra(${getDisplayName(component)})`

    const Component = options?.pure ? React.memo(Styled) : Styled

    return Component as ChakraComponentV2<C, T, StyledOptions<T>>
  }
}

export default createStyled
