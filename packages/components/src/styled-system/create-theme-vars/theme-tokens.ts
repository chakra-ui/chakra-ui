import { pick } from "@chakra-ui/utils/pick"

const tokens = [
  "colors",
  "borders",
  "borderWidths",
  "borderStyles",
  "fonts",
  "fontSizes",
  "fontWeights",
  "gradients",
  "letterSpacings",
  "lineHeights",
  "radii",
  "space",
  "shadows",
  "sizes",
  "zIndices",
  "transition",
  "blur",
  "breakpoints",
] as const

export type ThemeScale =
  | (typeof tokens)[number]
  | "transition.duration"
  | "transition.property"
  | "transition.easing"

export function extractTokens(theme: Record<string, any>) {
  const _tokens = tokens as unknown as string[]
  return pick(theme, _tokens)
}

export function extractSemanticTokens(theme: Record<string, any>) {
  return theme.semanticTokens
}

export function omitVars(rawTheme: Record<string, any>) {
  const { __cssMap, __cssVars, __breakpoints, ...cleanTheme } = rawTheme
  return cleanTheme
}
