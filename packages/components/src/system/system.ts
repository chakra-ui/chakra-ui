import {
  css,
  isStylePropFn,
  StyleProps,
  SystemStyleObject,
} from "@chakra-ui/styled-system"
import { assignAfter } from "@chakra-ui/utils/assign-after"
import { compact } from "@chakra-ui/utils/compact"
import { interopDefault } from "@chakra-ui/utils/interop-default"
import { runIfFn } from "@chakra-ui/utils/run-if-fn"
import { splitProps } from "@chakra-ui/utils/split-props"
import { Dict } from "@chakra-ui/utils/types"
import createStyled, { CSSObject, FunctionInterpolation } from "@emotion/styled"
import { createElement, forwardRef } from "react"
import { useColorMode } from "../color-mode"
import { shouldForwardProp } from "./should-forward-prop"
import { As, ChakraComponent, ChakraProps, PropsOf } from "./system.types"
import { DOMElements } from "./system.utils"

const emotion_styled = interopDefault(createStyled)

type StyleResolverProps = SystemStyleObject & {
  __css?: SystemStyleObject
  sx?: SystemStyleObject
  theme: any
  css?: CSSObject
}

interface GetStyleObject {
  (options: {
    baseStyle?:
      | SystemStyleObject
      | ((props: StyleResolverProps) => SystemStyleObject)
  }): FunctionInterpolation<StyleResolverProps>
}

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
export const toCSSObject: GetStyleObject =
  ({ baseStyle }) =>
  (props) => {
    const { theme, css: cssProp, __css, sx, ...restProps } = props
    const isStyleProp = isStylePropFn(theme)
    const [styleProps] = splitProps(restProps, isStyleProp)

    const finalBaseStyle = runIfFn(baseStyle, props)
    const finalStyles = assignAfter(
      {},
      __css,
      finalBaseStyle,
      compact(styleProps),
      sx,
    )
    const computedCSS = css(finalStyles)(props.theme)
    return cssProp ? [computedCSS, cssProp] : computedCSS
  }

export interface ChakraStyledOptions extends Dict {
  shouldForwardProp?(prop: string): boolean
  label?: string
  baseStyle?:
    | SystemStyleObject
    | ((props: StyleResolverProps) => SystemStyleObject)
}

export function styled<T extends As, P extends object = {}>(
  component: T,
  options?: ChakraStyledOptions,
) {
  const { baseStyle, ...styledOptions } = options ?? {}

  if (!styledOptions.shouldForwardProp) {
    styledOptions.shouldForwardProp = shouldForwardProp
  }

  const styleObject = toCSSObject({ baseStyle })
  const Component = emotion_styled(
    component as React.ComponentType<any>,
    styledOptions,
  )(styleObject)

  const chakraComponent = forwardRef(function ChakraComponent(props, ref) {
    const { colorMode, forced } = useColorMode()
    return createElement(Component, {
      ref,
      "data-theme": forced ? colorMode : undefined,
      ...props,
    })
  })

  return chakraComponent as ChakraComponent<T, P>
}

export type HTMLChakraComponents = {
  [Tag in DOMElements]: ChakraComponent<Tag, {}>
}

export type HTMLChakraProps<T extends As> = Omit<
  PropsOf<T>,
  "ref" | keyof StyleProps
> &
  ChakraProps & { as?: As }
