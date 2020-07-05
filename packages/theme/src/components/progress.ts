import {
  ComponentTheme,
  mode,
  getColor,
  generateStripe,
} from "@chakra-ui/theme-tools"

type ProgressTheme = ComponentTheme<{
  isIndeterminate?: boolean
  hasStripe?: boolean
}>

const getIndicatorStyles: ProgressTheme["baseStyle"] = (props) => {
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

  const shouldAddStripe = !isIndeterminate && hasStripe

  return {
    ...(shouldAddStripe && stripeStyle),
    bg: isIndeterminate ? gradient : bg,
  }
}

const sizes: ProgressTheme["sizes"] = {
  xs: {
    Track: { height: "0.25rem" },
  },
  sm: {
    Track: { height: "0.5rem" },
  },
  md: {
    Track: { height: "0.75rem" },
  },
  lg: {
    Track: { height: "1rem" },
  },
}

const Progress: ProgressTheme = {
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
  baseStyle: (props) => ({
    Label: {
      lineHeight: "1",
      fontSize: "0.25em",
    },
    Track: {
      bg: mode(`gray.100`, `whiteAlpha.300`)(props),
    },
    Indicator: {
      height: "100%",
      transition: "all 0.3s",
      ...getIndicatorStyles(props),
    },
  }),
  sizes,
}

export const ProgressSizes = {
  lg: "lg",
  sm: "sm",
  md: "md",
  xs: "xs",
}

export default Progress
