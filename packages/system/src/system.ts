import {
  css,
  isStyleProp,
  isOtherProp,
  StyleProps,
  SystemStyleObject,
} from "@chakra-ui/styled-system"
import {
  filterUndefined,
  objectFilter,
  mergeWith,
  runIfFn,
} from "@chakra-ui/utils"
import _styled, { CSSObject, FunctionInterpolation } from "@emotion/styled"
import { shouldForwardProp } from "./should-forward-prop"
import { As, ChakraComponent, ChakraProps, PropsOf } from "./system.types"
import { domElements, DOMElements } from "./system.utils"

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
export const toCSSObject: GetStyleObject = ({ baseStyle }) => (props) => {
  const { theme, css: cssProp, __css, sx, ...rest } = props
  const stylePrecedence = []

  // Styles are applied by precedence (lowest to highest)
  //   __css
  //   baseStyle
  //   other (apply, layerStyles, textStyles)
  //   styleProps
  //   sx
  //   css
  stylePrecedence.push({ ...__css })
  stylePrecedence.push(Object.assign({}, runIfFn(baseStyle, props)))
  stylePrecedence.push(objectFilter(rest, (_, prop) => isOtherProp(prop)))

  const styleProps = objectFilter(
    rest,
    (_, prop) => isStyleProp(prop) && !isOtherProp(prop),
  )
  stylePrecedence.push(filterUndefined(styleProps))

  stylePrecedence.push({ ...sx })

  const computedCSS = stylePrecedence.reduce((accStyle: any, style: any) => {
    return mergeWith(accStyle, css(style)(theme))
  }, {})

  return cssProp ? [computedCSS, cssProp] : computedCSS
}

interface StyledOptions {
  shouldForwardProp?(prop: string): boolean
  label?: string
  baseStyle?:
    | SystemStyleObject
    | ((props: StyleResolverProps) => SystemStyleObject)
}

export function styled<T extends As, P = {}>(
  component: T,
  options?: StyledOptions,
) {
  const { baseStyle, ...styledOptions } = options ?? {}

  if (!styledOptions.shouldForwardProp) {
    styledOptions.shouldForwardProp = shouldForwardProp
  }

  const styleObject = toCSSObject({ baseStyle })
  return _styled(
    component as React.ComponentType<any>,
    styledOptions,
  )(styleObject) as ChakraComponent<T, P>
}

export type HTMLChakraComponents = {
  [Tag in DOMElements]: ChakraComponent<Tag, {}>
}

export type HTMLChakraProps<T extends As> = Omit<
  PropsOf<T>,
  T extends "svg"
    ? "ref" | "children" | keyof StyleProps
    : "ref" | keyof StyleProps
> &
  ChakraProps & { as?: As }

type ChakraFactory = {
  <T extends As, P = {}>(
    component: T,
    options?: StyledOptions,
  ): ChakraComponent<T, P>
}

export const chakra = (styled as unknown) as ChakraFactory &
  HTMLChakraComponents

domElements.forEach((tag) => {
  chakra[tag] = chakra(tag)
})
