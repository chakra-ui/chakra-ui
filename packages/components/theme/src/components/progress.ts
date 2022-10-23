import { progressAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"
import { generateStripe } from "@chakra-ui/theme-tools"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $stripe = cssVar("progress-stripe")
const $bg = cssVar("progress-bg")

const filledStyle = defineStyle((props) => {
  const { colorScheme: c, isIndeterminate, hasStripe } = props

  const gradient = `linear-gradient(
    to right,
    transparent 0%,
    ${$stripe.reference} 50%,
    transparent 100%
  )`

  const addStripe = !isIndeterminate && hasStripe

  return {
    [$stripe.variable]: `colors.${c}.500`,
    ...(addStripe && generateStripe()),
    ...(isIndeterminate
      ? { bgImage: gradient }
      : { [$bg.variable]: `colors.${c}.500` }),

    _dark: {
      [$stripe.variable]: `colors.${c}.200`,
      ...(addStripe && generateStripe("1rem", "rgba(0,0,0,0.1)")),
      ...(!isIndeterminate && { [$bg.variable]: `colors.${c}.200` }),
    },

    bgColor: $bg.reference,
  }
})

const baseStyleLabel = defineStyle({
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white",
})

const baseStyleTrack = defineStyle({
  bg: $bg.reference,
  [$bg.variable]: "colors.gray.100",
  _dark: {
    [$bg.variable]: "colors.whiteAlpha.300",
  },
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
  track: baseStyleTrack,
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
