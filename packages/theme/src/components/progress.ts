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

const baseStyleTrack = function (props: Record<string, any>) {
  return {
    bg: mode(`gray.100`, `whiteAlpha.300`)(props),
  }
}

const baseStyleFilledTrack = function (props: Record<string, any>) {
  return {
    transition: "all 0.3s",
    ...filledStyle(props),
  }
}

const baseStyle = function (props: Record<string, any>) {
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
} as const

const progress = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  defaultProps,
})

export const progressStyles = {
  parts,
  sizes,
  baseStyle,
  defaultProps,
}

export default progress
