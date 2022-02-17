import { progressAnatomy as parts } from "@chakra-ui/anatomy"
import {
  generateStripe,
  getColor,
  PartsStyleFunction,
  PartsStyleObject,
  StyleFunctionProps,
} from "@chakra-ui/theme-tools"
import type {
  SystemStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools"

function filledStyle(props: StyleFunctionProps): SystemStyleObject {
  const { colorScheme: c, theme: t, isIndeterminate, hasStripe } = props

  const stripeStyleLight = generateStripe()
  const stripeStyleDark = generateStripe("1rem", "rgba(0,0,0,0.1)")
  const bgColorDark = `${c}.200`
  const bgColorLight = `${c}.500`

  const gradient = (bgColor: string) => `linear-gradient(
    to right,
    transparent 0%,
    ${getColor(t, bgColor)} 50%,
    transparent 100%
  )`

  const addStripe = !isIndeterminate && hasStripe

  return {
    ...(isIndeterminate
      ? {
          _dark: {
            bgImage: gradient(bgColorDark),
          },
          _light: {
            bgImage: gradient(bgColorLight),
          },
        }
      : {
          _light: {
            bgColor: bgColorLight,
            ...(addStripe && stripeStyleLight),
          },

          _dark: {
            bgColor: bgColorDark,
            ...(addStripe && stripeStyleDark),
          },
        }),
  }
}

const baseStyleLabel: SystemStyleObject = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white",
}

const baseStyleTrack: SystemStyleObject = {
  _light: {
    bg: "gray.100",
  },

  _dark: {
    bg: "whiteAlpha.300",
  },
}

const baseStyleFilledTrack: SystemStyleFunction = (props) => {
  return {
    transitionProperty: "common",
    transitionDuration: "slow",
    ...filledStyle(props),
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  label: baseStyleLabel,
  filledTrack: baseStyleFilledTrack(props),
  track: baseStyleTrack,
})

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  xs: {
    track: { h: "0.25rem" },
  },
  sm: {
    track: { h: "0.5rem" },
  },
  md: {
    track: { h: "0.75rem" },
  },
  lg: {
    track: { h: "1rem" },
  },
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
}

export default {
  parts: parts.keys,
  sizes,
  baseStyle,
  defaultProps,
}
