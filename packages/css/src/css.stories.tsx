import React from "react"
import { css } from "./css"

export default {
  title: "css",
}

const theme = {
  breakpoints: { sm: "40em", md: "52em", lg: "64em" },
  colors: {
    primary: "tomato",
    secondary: "cyan",
  },
  fontSizes: [12, 14, 16, 24, 36],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    monospace: "Menlo, monospace",
  },
  lineHeights: {
    body: 1.5,
  },
  fontWeights: {
    bold: 600,
  },
  sizes: {
    small: 4,
    medium: 8,
    large: 16,
    sidebar: 320,
  },
  buttons: {
    primary: {
      p: 3,
      fontWeight: "bold",
      color: "white",
      bg: "primary",
      borderRadius: 2,
    },
  },
  text: {
    caps: {
      fontSize: [1, 2],
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
    title: {
      fontSize: [3, 4],
      letterSpacing: ["-0.01em", "-0.02em"],
    },
  },
  borderWidths: {
    thin: 1,
  },
  borderStyles: {
    thick: "solid",
  },
  radii: {
    small: 5,
  },
}

export const example = () => {
  const result = css({
    color: "primary",
    h1: {
      py: [3, 4],
    },
  })({ theme })

  console.log(result)
  return <div>Crack the bug</div>
}
