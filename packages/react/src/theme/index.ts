import { defineConfig } from "../styled-system"
import { breakpoints } from "./breakpoints"
import { globalCss } from "./global-css"
import { recipes } from "./recipes"
import { semanticColors } from "./semantic-tokens/colors"
import { semanticShadows } from "./semantic-tokens/shadows"
import { slotRecipes } from "./slot-recipes"
import { animations } from "./tokens/animations"
import { blurs } from "./tokens/blurs"
import { borders } from "./tokens/borders"
import { colors } from "./tokens/colors"
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

export const defaultThemeConfig = defineConfig({
  preflight: true,
  cssVarsPrefix: "chakra",
  cssVarsRoot: ":where(:root, :host)",
  globalCss: globalCss,
  theme: {
    breakpoints: breakpoints,
    keyframes: keyframes,
    tokens: {
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
    },
    semanticTokens: {
      colors: semanticColors,
      shadows: semanticShadows,
    },
    recipes: recipes,
    slotRecipes: slotRecipes,
  },
})
