import { mode, SystemStyleFunction } from "@chakra-ui/theme-tools"

import { getComponentBaseStyle } from ".."

const baseStyle: SystemStyleFunction = (props) => {
  const { theme } = props
  const headingBase = getComponentBaseStyle(theme, "Heading")

  return {
    h1: {
      ...headingBase,
      fontSize: { base: "4xl", md: "5xl" },
      mb: { base: 8, md: 10 },
      fontWeight: 800,
    },
    h2: {
      ...headingBase,
      fontSize: { base: "2xl", md: "3xl" },
      mt: { base: 12, md: 14 },
      mb: { base: 6, md: 8 },
    },
    h3: {
      ...headingBase,
      fontSize: { base: "xl", md: "2xl" },
      fontWeight: 600,
      mb: { base: 3, md: 4 },
    },
    h4: {
      ...headingBase,
      fontSize: { base: "md", md: "lg" },
      fontWeight: 600,
      mb: 2,
    },
    p: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "md",
      lineHeight: 6,
      my: 4,
    },
    a: {
      textDecoration: "underline",
      fontWeight: "semibold",
    },
    hr: {
      my: { base: 12, md: 14 },
      borderColor: mode("gray.200", "gray.700")(props),
    },
    blockquote: {
      paddingStart: 4,
      my: { base: 6, md: 8 },
      borderStartWidth: "4px",
      borderStartColor: mode("gray.200", "gray.600")(props),
      fontStyle: "italic",
      fontWeight: "semibold",
    },
    pre: {
      p: 4,
      rounded: "md",
      bg: mode("gray.800", "gray.700")(props),
      color: "gray.50",
      overflow: "auto",

      code: {
        fontWeight: "normal",
      },
    },
    code: {
      fontWeight: "semibold",
    },
    figure: {
      my: 8,

      figcaption: {
        color: mode("gray.500", "gray.400")(props),
        mt: 3,
      },
    },
    ul: {
      paddingStart: 6,

      li: {
        paddingStart: 2,
        my: 3,

        "::marker": {
          color: mode("gray.300", "gray.500")(props),
        },
      },
    },
    ol: {
      paddingStart: 6,

      li: {
        paddingStart: 2,
        my: 3,

        "::marker": {
          color: mode("gray.600", "gray.400")(props),
        },
      },
    },
    table: {
      width: "full",
      my: 8,
      textAlign: "start",

      thead: {
        borderBottomWidth: "1px",
        borderBottomColor: mode("gray.300", "gray.600")(props),
      },

      th: {
        textAlign: "inherit",
        fontWeight: 600,
        p: { base: 2, md: 3 },
      },

      td: {
        p: { base: 2, md: 3 },
        verticalAlign: "baseline",
      },

      tbody: {
        tr: {
          borderBottomWidth: "1px",
          borderBottomColor: mode("gray.200", "gray.700")(props),

          ":last-of-type": {
            borderBottomWidth: "0px",
            borderBottomColor: "transparent",
          },
        },
      },

      tfoot: {
        tr: {
          borderTopWidth: "1px",
          borderTopColor: mode("gray.300", "gray.600")(props),
        },
      },
    },
  }
}

export default {
  baseStyle,
}
