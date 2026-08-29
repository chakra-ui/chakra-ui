import { animationStyles } from "./animation-styles"
import { breakpoints } from "./breakpoints"
import { definePreset } from "./def"
import { globalCss } from "./global-css"
import { keyframes } from "./keyframes"
import { layerStyles } from "./layer-styles"
import { patterns } from "./patterns"
import { recipes } from "./recipes"
import { semanticTokens } from "./semantic-tokens"
import { slotRecipes } from "./slot-recipes"
import { textStyles } from "./text-styles"
import { tokens } from "./tokens"
import { utilities } from "./utilities"

export { defaultBaseConfig, defaultConditions } from "./base-config"
export { createColorMixTransform, colorMix } from "./color-mix"
export { cssVar } from "./css-var"

export default definePreset({
  name: "@chakra-ui/panda-preset",
  globalCss,
  patterns,
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
  utilities: {
    extend: utilities,
  },
  conditions: {
    extend: {
      icon: "& :where(svg)",
    },
  },
})
