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

const baseStyleLabel = defineStyle({
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white",
})

const baseStyleTrack = defineStyle((props) => {
  return {
    bg: mode("gray.100", "whiteAlpha.300")(props),
  }
})

const baseStyleFilledTrack = defineStyle((props) => {
  return {
    transitionProperty: "common",
    transitionDuration: "slow",
    ...filledStyle(props),
  }
})

const baseStyle = definePartsStyle((props) => ({
  label: baseStyleLabel,
  filledTrack: baseStyleFilledTrack(props),
  track: baseStyleTrack(props),
}))

const sizes = {
  xs: definePartsStyle({
    track: { h: "0.25rem" },
  }),
  sm: definePartsStyle({
    track: { h: "0.5rem" },
  }),
  md: definePartsStyle({
    track: { h: "0.75rem" },
  }),
  lg: definePartsStyle({
    track: { h: "1rem" },
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
