import {
  generateStripe,
  getColor,
  mode,
  multiStyleConfig,
} from "@chakra-ui/theme-tools"

function filledStyle(props: Record<string, any>) {
  const { colorScheme: c, theme: t, isIndeterminate, hasStripe } = props

  const stripeStyle = mode(
    generateStripe(),
    generateStripe("1rem", "rgba(0,0,0,0.1)"),
  )(props)

  const bg = mode(`${c}.500`, `${c}.200`)(props)

  const gradient = `linear-gradient(
    to right,
    transparent 0%,
    ${getColor(t, bg)} 50%,
    transparent 100%
  )`

  const addStripe = !isIndeterminate && hasStripe

  return {
    ...(addStripe && stripeStyle),
    bgColor: isIndeterminate ? gradient : bg,
  }
}

const parts = {
  track: "the linear progress track",
  filledTrack: "the inner filled track",
  label: "the value indicator or label",
}

const baseStyleLabel = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white",
}

// @ts-ignore
const baseStyleTrack = function (props) {
  return {
    bg: mode(`gray.100`, `whiteAlpha.300`)(props),
  }
}

// @ts-ignore
const baseStyleFilledTrack = function (props) {
  return {
    transition: "all 0.3s",
    ...filledStyle(props),
  }
}

// @ts-ignore
const baseStyle = function (props) {
  return {
    label: baseStyleLabel,
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

const progress = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  // @ts-ignore
  defaultProps,
})

export const progressStyles = {
  parts,
  sizes,
  baseStyleLabel,
  baseStyleTrack,
  baseStyleFilledTrack,
  defaultProps,
}

export default progress
