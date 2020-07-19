import {
  generateStripe,
  getColor,
  mode,
  styleConfig,
} from "@chakra-ui/theme-tools"

const progress = styleConfig({
  parts: {
    track: "the linear progress track",
    filledTrack: "the inner filled track",
    label: "the value indicator or label",
  },

  baseStyle: function (props) {
    return {
      label: {
        lineHeight: "1",
        fontSize: "0.25em",
        fontWeight: "bold",
        color: "white",
      },
      track: {
        bg: mode(`gray.100`, `whiteAlpha.300`)(props),
      },
      filledTrack: {
        transition: "all 0.3s",
        ...filledStyle(props),
      },
    }
  },

  sizes: {
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
  },

  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})

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
    bg: isIndeterminate ? gradient : bg,
  }
}

export default progress
