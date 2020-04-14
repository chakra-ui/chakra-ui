import { getColor } from "@chakra-ui/color"
import { ComponentTheme, mode } from "./utils"

type ProgressTheme = ComponentTheme<{ isIndeterminate?: boolean }>

const getProgressBg: ProgressTheme["baseStyle"] = props => {
  const { colorScheme: c, theme: t } = props
  const bg = mode(`${c}.500`, `${c}.200`)(props)

  if (props.isIndeterminate) {
    return {
      bg: `linear-gradient(
        to right,
        transparent 0%,
        ${getColor(t, bg)} 50%,
        transparent 100%
      )`,
    }
  }
  return { bg }
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
  baseStyle: props => ({
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
      ...getProgressBg(props),
    },
  }),
  sizes,
}

export default Progress
