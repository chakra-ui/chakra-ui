import { ResponsiveValue, StyleObjectOrFn } from "@chakra-ui/styled-system"
import {
  createMediaQueries,
  isCustomBreakpoint,
  objectToArrayNotation,
  runIfFn,
  __DEV__,
} from "@chakra-ui/utils"

export interface ResolveResponsivePropStylesOptions {
  responsiveValue: ResponsiveValue<string>
  responsiveStyles: Record<string, StyleObjectOrFn>
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

  // If `responsiveValue` is a primitive value (not responsive),
  // return its styles early.
  if (
    typeof responsiveValue === "string" ||
    typeof responsiveValue === "number"
  ) {
    return runIfFn(responsiveStyles[responsiveValue] ?? {}, props)
  }

  const mediaQueries = createMediaQueries(breakpoints)

  // for example: ["base", "sm", "md", "lg", "xl", "2xl"]
  const breakpointKeys = Object.keys(breakpoints).filter(isCustomBreakpoint)

  const responsiveValueArray = Array.isArray(responsiveValue)
    ? responsiveValue
    : objectToArrayNotation(responsiveValue, breakpointKeys)

  const resolvedStyles = Object.fromEntries(
    responsiveValueArray
      // Slice in case responsive values array
      // has more values than there are breakpoints.
      .slice(0, mediaQueries.length)
      .flatMap((name, breakpointIndex) => {
        if (name == null) {
          return []
        }

        const styles = runIfFn(responsiveStyles[name as string] ?? {}, props)

        const { minWidth } = mediaQueries[breakpointIndex]

        const nextValueBreakpointIndex = responsiveValueArray.findIndex(
          (value, index) => index > breakpointIndex && value != null,
        )

        const mediaMaxWidth =
          nextValueBreakpointIndex !== -1
            ? mediaQueries[nextValueBreakpointIndex - 1].mediaMaxWidth
            : null

        const isZeroMinWidth = minWidth.startsWith("0")

        // If the media query equals to `@media (min-width: 0<unit>)`,
        // don't nest the styles inside the media query.
        if (isZeroMinWidth && mediaMaxWidth == null) {
          return Object.entries(styles)
        }

        const queryParts = [
          !isZeroMinWidth ? `(min-width: ${minWidth})` : null,
          mediaMaxWidth != null ? `(max-width: ${mediaMaxWidth})` : null,
        ].filter((query) => query != null)

        const mediaQuery = `@media ${queryParts.join(" and ")}`

        return [[mediaQuery, styles]]
      }),
  )

  return resolvedStyles
}
