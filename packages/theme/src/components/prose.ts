import type { SystemStyleFunction } from "@chakra-ui/theme-tools"

import { getComponentBaseStyle } from ".."

const baseStyle: SystemStyleFunction = (props) => {
  const { theme } = props
  const headingBase = getComponentBaseStyle(theme, "Heading")

  return {
    h1: {
      ...headingBase,
      fontSize: "7xl",
    },
    h2: {
      ...headingBase,
      fontSize: "5xl",
    },
    h3: {
      ...headingBase,
      fontSize: "3xl",
    },
    h4: {
      ...headingBase,
      fontSize: "xl",
    },
    p: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "md",
      lineHeight: 6,
      marginY: 4,
    },
  }
}

export default {
  baseStyle,
}
