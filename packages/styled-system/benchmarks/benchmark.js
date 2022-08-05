// @ts-check

const { isMainThread } = require("worker_threads")
const { css, toCSSVar } = require("../dist/index.cjs.js")

const theme = toCSSVar({
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
  colors: {
    red: {
      500: "#ff0000",
    },
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
  textTransform: {
    header: "uppercase",
  },
  transition: {
    duration: {
      slow: "1s",
    },
    easing: {
      smooth: "ease-in-out",
    },
    property: {
      common: "opacity, transform, background-color, color",
    },
  },
})

async function main() {
  const { cronometro } = await import("cronometro")

  return cronometro(
    {
      systemProps() {
        css({
          color: "primary",
          h1: {
            py: [3, 4],
          },
        })(theme)
      },
    },
    {},
    (err, _results) => {
      if (err) {
        throw err
      }
    },
  )
}

if (isMainThread) {
  main()
} else {
  module.exports = main
}
