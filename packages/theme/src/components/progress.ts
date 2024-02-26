import { progressAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { generateStripe, getColor, mode } from "@chakra-ui/theme-tools"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const filledStyle = defineStyle((props) => {
  const { colorScheme: c, theme: t, isIndeterminate, hasStripe } = props

  const stripeStyle = mode(
    generateStripe(),
    generateStripe("1rem", "rgba(0,0,0,0.1)"),
  )(props)

  const bgColor = mode(`${c}.500`, `${c}.200`)(props)

  const gradient = `linear-gradient(
    to right,
    transparent 0%,
    ${getColor(t, bgColor)} 50%,
    transparent 100%
  )`

  const addStripe = !isIndeterminate && hasStripe

  return {
    ...(addStripe && stripeStyle),
    ...(isIndeterminate ? { bgImage: gradient } : { bgColor }),
  }
})

const baseStyleValueText = defineStyle({
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white",
})

const baseStyleTrack = defineStyle((props) => {
  return {
    overflow: "hidden",
    position: "relative",
    bg: mode("gray.100", "whiteAlpha.300")(props),
  }
})

const baseStyleFilledTrack = defineStyle((props) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionProperty: "common",
    transitionDuration: "slow",
    height: "100%",
    ...filledStyle(props),
    "&[data-animated]": {
      animation: "var(--stripe-animation) 1s linear infinite",
    },
    "&[data-indeterminate]": {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      animation:
        "var(--progress-animation) 1s ease infinite normal none running",
    },
  }
})

const baseStyle = definePartsStyle((props) => ({
  valueText: baseStyleValueText,
  filledTrack: baseStyleFilledTrack(props),
  track: baseStyleTrack(props),
}))

const sizes = {
  xs: definePartsStyle({
    track: { h: "1" },
  }),
  sm: definePartsStyle({
    track: { h: "2" },
  }),
  md: definePartsStyle({
    track: { h: "3" },
  }),
  lg: definePartsStyle({
    track: { h: "4" },
  }),
}

export const progressTheme = defineMultiStyleConfig({
  sizes,
  baseStyle,
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})
