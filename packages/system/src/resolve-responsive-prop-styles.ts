import { ResponsiveValue, SystemStyleObject } from "@chakra-ui/styled-system"
import {
  createMediaQueries,
  isCustomBreakpoint,
  objectToArrayNotation,
  runIfFn,
  __DEV__,
} from "@chakra-ui/utils"

export interface ResolveResponsivePropStylesOptions {
  responsiveValue: ResponsiveValue<string>
  responsiveStyles: Record<string, SystemStyleObject>
  breakpoints: string[]
  props: Record<string, any>
}

export function resolveResponsivePropStyles({
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
