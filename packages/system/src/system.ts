import {
  css,
  propNames,
  ResponsiveValue,
  SystemProps,
  SystemStyleObject,
} from "@chakra-ui/styled-system"
import {
  memoizedGet as get,
  objectFilter,
  objectAssign,
  Dict,
  isFunction,
} from "@chakra-ui/utils"
import createStyled, {
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
const stylePropNames = propNames.reduce((keymirror, key) => {
  if (typeof key !== "object" && typeof key !== "function") keymirror[key] = key
  return keymirror
}, {})

interface StyleResolverProps extends SystemProps {
  __css?: SystemStyleObject
  sx?: SystemStyleObject
  theme: Dict
  css?: CSSObject
  noOfLines?: ResponsiveValue<number>
  isTruncated?: boolean
  layerStyle?: string
  textStyle?: string
  apply?: ResponsiveValue<string>
}

type StyleResolver = (params: {
  baseStyle?: SystemStyleObject
}) => FunctionInterpolation<StyleResolverProps>

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
export const styleResolver: StyleResolver = ({ baseStyle }) => (props) => {
  const {
    theme,
    layerStyle,
    textStyle,
    apply,
    noOfLines,
    isTruncated,
    css: cssProp,
    __css,
    sx,
    ...rest
  } = props

  const _layerStyle = get(theme, `layerStyles.${layerStyle}`, {})
  const _textStyle = get(theme, `textStyles.${textStyle}`, {})

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
  const finalStyles = objectAssign(
    {},
    __css,
    baseStyle,
    { apply },
    _layerStyle,
    _textStyle,
    truncateStyle,
    styleProps,
    sx,
  )

  // Converts theme-aware style object to real css object
  const computedCSS = css(finalStyles)(props.theme)

  // Merge the computed css object with styles in css prop
  const cssObject: Interpolation<StyleResolverProps> = objectAssign(
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
  const opts = { ...styledOptions, shouldForwardProp }

  const _styled = createStyled(component as React.ComponentType<any>, opts)
  const interpolation = styleResolver({ baseStyle })
  const StyledComponent: any = _styled(interpolation)

  return StyledComponent as ChakraComponent<T, P>
}

export type HTMLChakraComponents = {
  [Tag in DOMElements]: ChakraComponent<Tag, {}>
}

export type WithChakraProps<T extends As> = Omit<
  PropsOf<T>,
  T extends "svg" ? "ref" | "children" : "ref"
> &
  ChakraProps & { as?: As }

export type HTMLChakraProps = {
  [Tag in DOMElements]: WithChakraProps<Tag>
}

type ChakraFactory = {
  <T extends As, P = {}>(
    component: T,
    options?: StyledOptions,
  ): ChakraComponent<T, P>
}

export const chakra = (styled as unknown) as ChakraFactory &
  HTMLChakraComponents

domElements.forEach((tag) => {
  // @ts-expect-error
  chakra[tag] = chakra(tag)
})
