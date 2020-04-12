import { ComponentTheme, mode } from "./utils"
import { getColor } from "@chakra-ui/color"

const getProgressBg = (props: any) => {
  const indicatorBg = mode(
    `${props.colorScheme}.500`,
    `${props.colorScheme}.200`,
  )(props)

  if (props.isIndeterminate) {
    return `linear-gradient(
        to right,
        transparent 0%,
        ${getColor(props.theme, indicatorBg)} 50%,
        transparent 100%
      )`
  }
  return indicatorBg
}

const sizes: ComponentTheme["sizes"] = {
  xs: {
    Track: {
      height: "0.25rem",
    },
  },
  sm: {
    Track: {
      height: "0.5rem",
    },
  },
  md: {
    Track: {
      height: "0.75rem",
    },
  },
  lg: {
    Track: {
      height: "1rem",
    },
  },
}

const Progress: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: props => ({
    Label: {
      top: "50%",
      left: "50%",
      width: "100%",
      lineHeight: "1",
      fontSize: "0.25em",
      textAlign: "center",
      position: "absolute",
      transform: "translate(-50%, -50%)",
    },
    Track: {
      overflow: "hidden",
      position: "relative",
      bg: mode(`gray.100`, `whiteAlpha.300`)(props),
    },
    Indicator: {
      height: "100%",
      transition: "all 0.3s",
      bg: getProgressBg(props),
    },
  }),
  sizes,
}

export default Progress
