import { defaultConfig } from "../preset"
import { createSystem } from "./system"

export const fixtureConfig = createSystem({
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    layerStyles: {
      v1: {
        value: {
          color: "red.300",
          bg: "tomato",
        },
      },
    },
    textStyles: {
      caps: {
        value: {
          textTransform: "uppercase",
          letterSpacing: "wide",
          fontSize: "lg",
        },
      },
      lower: {
        value: {
          textTransform: "lowercase",
          letterSpacing: "0.2px",
          fontSize: "sm",
        },
      },
    },
  },
})

export default fixtureConfig
