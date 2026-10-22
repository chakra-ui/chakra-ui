import { defineConfig } from "../styled-system/index.ts"
import { breakpoints } from "./breakpoints.ts"
import { globalCss } from "./global-css.ts"
import { layerStyles } from "./layer-styles.ts"
import { animationStyles } from "./motion-styles.ts"
import { recipes } from "./recipes.ts"
import { semanticColors } from "./semantic-tokens/colors.ts"
import { semanticRadii } from "./semantic-tokens/radii.ts"
import { semanticShadows } from "./semantic-tokens/shadows.ts"
import { slotRecipes } from "./slot-recipes.ts"
import { textStyles } from "./text-styles.ts"
import { animations } from "./tokens/animations.ts"
import { aspectRatios } from "./tokens/aspect-ratios.ts"
import { blurs } from "./tokens/blurs.ts"
import { borders } from "./tokens/borders.ts"
import { colors } from "./tokens/colors.ts"
import { cursor } from "./tokens/cursor.ts"
import { durations } from "./tokens/durations.ts"
import { easings } from "./tokens/easings.ts"
import { fontSizes } from "./tokens/font-sizes.ts"
import { fontWeights } from "./tokens/font-weights.ts"
import { fonts } from "./tokens/fonts.ts"
import { keyframes } from "./tokens/keyframes.ts"
import { letterSpacings } from "./tokens/letter-spacing.ts"
import { lineHeights } from "./tokens/line-heights.ts"
import { radii } from "./tokens/radius.ts"
import { sizes } from "./tokens/sizes.ts"
import { spacing } from "./tokens/spacing.ts"
import { zIndices } from "./tokens/z-indices.ts"

export const tokens = {
  aspectRatios,
  animations,
  blurs,
  borders,
  colors,
  durations,
  easings,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  spacing,
  sizes,
  zIndex: zIndices,
  cursor,
}

export const semanticTokens = {
  colors: semanticColors,
  shadows: semanticShadows,
  radii: semanticRadii,
}

export const cssVarsPrefix = "chakra"
export const cssVarsRoot = ":where(html, .chakra-theme)"

export const defaultThemeConfig = defineConfig({
  preflight: true,
  cssVarsPrefix,
  cssVarsRoot,
  globalCss,
  theme: {
    breakpoints,
    keyframes,
    tokens,
    semanticTokens,
    recipes,
    slotRecipes,
    textStyles,
    layerStyles,
    animationStyles,
  },
})

export {
  recipes,
  slotRecipes,
  breakpoints,
  keyframes,
  textStyles,
  layerStyles,
  animationStyles,
  globalCss,
}

export * from "./recipes.export.ts"
export * from "./slot-recipes.export.ts"
