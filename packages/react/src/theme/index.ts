import { defineConfig } from "../styled-system"
import { breakpoints } from "./breakpoints"
import { globalCss } from "./global-css"
import { layerStyles } from "./layer-styles"
import { animationStyles } from "./motion-styles"
import { recipes } from "./recipes"
import { semanticColors } from "./semantic-tokens/colors"
import { semanticRadii } from "./semantic-tokens/radii"
import { semanticShadows } from "./semantic-tokens/shadows"
import { slotRecipes } from "./slot-recipes"
import { textStyles } from "./text-styles"
import { animations } from "./tokens/animations"
import { aspectRatios } from "./tokens/aspect-ratios"
import { blurs } from "./tokens/blurs"
import { borders } from "./tokens/borders"
import { colors } from "./tokens/colors"
import { cursor } from "./tokens/cursor"
import { durations } from "./tokens/durations"
import { easings } from "./tokens/easings"
import { fontSizes } from "./tokens/font-sizes"
import { fontWeights } from "./tokens/font-weights"
import { fonts } from "./tokens/fonts"
import { keyframes } from "./tokens/keyframes"
import { letterSpacings } from "./tokens/letter-spacing"
import { lineHeights } from "./tokens/line-heights"
import { radii } from "./tokens/radius"
import { sizes } from "./tokens/sizes"
import { spacing } from "./tokens/spacing"
import { zIndices } from "./tokens/z-indices"

export const defaultThemeConfig = defineConfig({
  preflight: true,
  cssVarsPrefix: "chakra",
  cssVarsRoot: ":where(html, .chakra-theme)",
  globalCss: globalCss,
  theme: {
    breakpoints: breakpoints,
    keyframes: keyframes,
    tokens: {
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
    },
    semanticTokens: {
      colors: semanticColors,
      shadows: semanticShadows,
      radii: semanticRadii,
    },
    recipes: recipes,
    slotRecipes: slotRecipes,
    textStyles: textStyles,
    layerStyles: layerStyles,
    animationStyles: animationStyles,
  },
})
