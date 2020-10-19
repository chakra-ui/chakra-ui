import { generateStripe, getColor, mode } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

const parts = ["track", "filledTrack", "panel"]

function filledStyle(props: Dict) {
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
}

const baseStyleLabel = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white",
}

function baseStyleTrack(props: Dict) {
  return {
    bg: mode(`gray.100`, `whiteAlpha.300`)(props),
  }
}

function baseStyleFilledTrack(props: Dict) {
  return {
    transition: "all 0.3s",
    ...filledStyle(props),
  }
}

const baseStyle = function (props: Dict) {
  return {
    label: baseStyleLabel,
    filledTrack: baseStyleFilledTrack(props),
    track: baseStyleTrack(props),
  }
}

const sizes = {
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
  parts,
  sizes,
  baseStyle,
  defaultProps,
}
