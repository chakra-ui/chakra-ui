import { animationStyles } from "./animation-styles"
import { breakpoints } from "./breakpoints"
import { definePreset } from "./def"
import { globalCss } from "./global-css"
import { keyframes } from "./keyframes"
import { layerStyles } from "./layer-styles"
import { recipes } from "./recipes"
import { semanticTokens } from "./semantic-tokens"
import { slotRecipes } from "./slot-recipes"
import { textStyles } from "./text-styles"
import { tokens } from "./tokens"
import { utilities } from "./utilities"

export default definePreset({
  name: "@chakra-ui/panda-preset",
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
  utilities: {
    extend: utilities,
  },
  conditions: {
    extend: {
      icon: "& :where(svg)",
    },
  },
})
