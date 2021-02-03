import { ResponsiveValue, SystemStyleObject } from "@chakra-ui/styled-system"
import {
  createMediaQueries,
  filterUndefined,
  isCustomBreakpoint,
  memoizedGet as get,
  mergeWith,
  objectToArrayNotation,
  omit,
  runIfFn,
} from "@chakra-ui/utils"
import { useMemo, useRef } from "react"
import isEqual from "react-fast-compare"
import { useChakra } from "./hooks"
import { ThemingProps } from "./system.types"

export function useStyleConfig(
  themeKey: string,
  props: ThemingProps,
  opts: { isMultiPart: true },
): Record<string, SystemStyleObject>

export function useStyleConfig(
  themeKey: string,
  props?: ThemingProps,
  opts?: { isMultiPart?: boolean },
): SystemStyleObject

export function useStyleConfig(themeKey: any, props: any = {}, opts: any = {}) {
  const { styleConfig: styleConfigProp, ...rest } = props

  const { theme, colorMode } = useChakra()
  const { breakpoints } = theme
  const themeStyleConfig = get(theme, `components.${themeKey}`)
  const styleConfig = styleConfigProp || themeStyleConfig

  const mergedProps = mergeWith(
    { theme, colorMode },
    styleConfig?.defaultProps ?? {},
    filterUndefined(omit(rest, ["children"])),
  )

  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */
  type StylesRef = SystemStyleObject | Record<string, SystemStyleObject>
  const stylesRef = useRef<StylesRef>({})

  return useMemo(() => {
    if (styleConfig) {
      const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, mergedProps)

      const variantStyles = resolveResponsivePropStyles({
        breakpoints,
        responsiveValue: mergedProps.variant,
        responsiveStyles: styleConfig.variants ?? {},
        props: mergedProps,
      })

      const sizeStyles = resolveResponsivePropStyles({
        breakpoints,
        responsiveValue: mergedProps.size,
        responsiveStyles: styleConfig.sizes ?? {},
        props: mergedProps,
      })

      const styles = mergeWith({}, baseStyles, sizeStyles, variantStyles)

      if (opts?.isMultiPart && styleConfig.parts) {
        styleConfig.parts.forEach((part: string) => {
          styles[part] = styles[part] ?? {}
        })
      }

      const isStyleEqual = isEqual(stylesRef.current, styles)

      if (!isStyleEqual) {
        stylesRef.current = styles
      }
    }

    return stylesRef.current
  }, [breakpoints, styleConfig, mergedProps, opts?.isMultiPart])
}

export function useMultiStyleConfig(themeKey: string, props: any) {
  return useStyleConfig(themeKey, props, { isMultiPart: true })
}

interface ResolveResponsivePropStylesOptions {
  responsiveValue: ResponsiveValue<string>
  responsiveStyles: Record<string, SystemStyleObject>
  breakpoints: string[]
  props: Record<string, any>
}

function resolveResponsivePropStyles({
  responsiveValue,
  responsiveStyles,
  breakpoints,
  props,
}: ResolveResponsivePropStylesOptions) {
  if (responsiveValue == null) {
    return {}
  }

  // for example: ["base", "sm", "md", "lg", "xl", "2xl"]
  const breakpointKeys = Object.keys(breakpoints).filter(isCustomBreakpoint)

  // If `responsiveValue` is a primitive value (not responsive),
  // wrap the value into an array.
  const sanitizedValue =
    typeof responsiveValue === "string" || typeof responsiveValue === "number"
      ? [responsiveValue]
      : responsiveValue

  const sanitizedValueArray = Array.isArray(sanitizedValue)
    ? sanitizedValue
    : objectToArrayNotation(sanitizedValue, breakpointKeys)

  const mediaQueries = createMediaQueries(breakpoints)

  const resolvedStyles = Object.fromEntries(
    sanitizedValueArray.flatMap((name, breakpointIndex) => {
      if (name == null) {
        return []
      }

      const styles = runIfFn(responsiveStyles[name as string] ?? {}, props)

      const { minWidth } = mediaQueries[breakpointIndex]

      const nextValueBreakpointIndex = sanitizedValueArray.findIndex(
        (value, index) => index > breakpointIndex && value != null,
      )

      const mediaMaxWidth =
        nextValueBreakpointIndex !== -1
          ? mediaQueries[nextValueBreakpointIndex - 1].mediaMaxWidth
          : null

      const mediaQuery = `@media (min-width: ${minWidth})${
        mediaMaxWidth != null ? ` and (max-width: ${mediaMaxWidth})` : ``
      }`

      // If the media query equals to `@media (min-width: 0<unit>)`,
      // don't nest the styles inside the media query.
      if (minWidth.startsWith("0") && mediaMaxWidth == null) {
        return Object.entries(styles)
      }

      return [[mediaQuery, styles]]
    }),
  )

  return resolvedStyles
}
