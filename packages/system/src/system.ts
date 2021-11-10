import {
  css,
  propNames,
  ResponsiveValue,
  StyleProps,
  SystemStyleObject,
} from "@chakra-ui/styled-system"
import { Dict, isFunction, objectFilter } from "@chakra-ui/utils"
import _styled, {
  CSSObject,
  FunctionInterpolation,
  Interpolation,
} from "@emotion/styled"
import { shouldForwardProp } from "./should-forward-prop"
import { As, ChakraComponent, ChakraProps, PropsOf } from "./system.types"
import { domElements, DOMElements } from "./system.utils"

/**
 * Convert propNames array to object to faster lookup perf
 */
const stylePropNames = propNames.reduce((acc, key) => {
  if (typeof key !== "object" && typeof key !== "function") acc[key] = key
  return acc
}, {})

type StyleResolverProps = SystemStyleObject & {
  __css?: SystemStyleObject
  sx?: SystemStyleObject
  theme: Dict
  css?: CSSObject
  noOfLines?: ResponsiveValue<number>
  isTruncated?: boolean
}

interface GetStyleObject {
  (options: {
    baseStyle?: SystemStyleObject
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
export const getStyleObject: GetStyleObject = ({ baseStyle }) => (props) => {
  const {
    theme,
    noOfLines,
    isTruncated,
    css: cssProp,
    __css,
    sx,
    ...rest
  } = props

  // filter out props that aren't style props
  const styleProps = objectFilter(rest, (_, prop) => prop in stylePropNames)

  let truncateStyle: any = {}

  if (noOfLines != null) {
    truncateStyle = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: noOfLines,
    }
  } else if (isTruncated) {
    truncateStyle = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }
  }

  /**
   * The computed, theme-aware style object. The other of the properties
   * within `objectAssign` determines how styles are overriden.
   */
  const finalStyles = Object.assign(
    {},
    __css,
    baseStyle,
    truncateStyle,
    styleProps,
    sx,
  )

  // Converts theme-aware style object to real css object
  const computedCSS = css(finalStyles)(props.theme)

  // Merge the computed css object with styles in css prop
  const cssObject: Interpolation<StyleResolverProps> = Object.assign(
    computedCSS,
    isFunction(cssProp) ? cssProp(theme) : cssProp,
  )

  return cssObject
}

interface StyledOptions {
  shouldForwardProp?(prop: string): boolean
  label?: string
  baseStyle?: SystemStyleObject
}

export function styled<T extends As, P = {}>(
  component: T,
  options?: StyledOptions,
) {
  const { baseStyle, ...styledOptions } = options ?? {}

  if (!styledOptions.shouldForwardProp) {
    styledOptions.shouldForwardProp = shouldForwardProp
  }

  const styleObject = getStyleObject({ baseStyle })
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
