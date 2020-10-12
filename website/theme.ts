import { extendTheme } from "@chakra-ui/core"
import { mode } from "@chakra-ui/theme-tools"

export const customTheme = extendTheme({
  mdx: {
    a: {
      _hover: {
        color: "teal.600",
      },
      color: "teal.500",
      fontWeight: "semibold",
      transition: "color 0.15s",
      transitionTimingFunction: "ease-out",
    },
    blockquote: {
      bg: "orange.100",
      borderColor: "orange.200",
      borderWidth: "1px",
      my: "1.5rem",
      px: "1.25rem",
      py: "1rem",
      rounded: "lg",
    },
    code: {
      fontSize: "0.875em",
      lineHeight: "normal",
      px: "1",
      py: "2px",
      rounded: "sm",
      whiteSpace: "nowrap",
    },
    h1: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      letterSpacing: "-.025em",
      lineHeight: 1.2,
      mb: ".25rem",
      mt: "2rem",
    },
    h2: {
      "& + h3": {
        mt: "1.5rem",
      },
      fontSize: "1.5rem",
      fontWeight: "semibold",
      letterSpacing: "-.025em",
      lineHeight: 1,
      mb: "0.5rem",
      mt: "4rem",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: "semibold",
      letterSpacing: "-.025em",
      // mb: "0.5rem",
      lineHeight: 1.25,
      mt: "3rem",
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: "semibold",
      lineHeight: 1.375,
      mt: "3rem",
    },
    hr: {
      my: "4rem",
    },
    p: {
      "blockquote &": {
        mt: 0,
      },
      lineHeight: 1.7,
      mt: "1.25rem",
    },
    ul: {
      "& > * + *": {
        mt: "0.25rem",
      },
      "blockquote &": { mt: 0 },
      ml: "1.25rem",
      mt: "1.5rem",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        ".deleted": {
          color: "#ff8383 !important",
          fontStyle: "normal !important",
        },
        ".inserted": {
          color: "#b5f4a5 !important",
          fontStyle: "normal !important",
        },
        color: mode("gray.700", "whiteAlpha.900")(props),
        fontFamily: "Inter, sans-serif",
      },
    }),
  },
  textStyles: {
    caps: {
      fontSize: "sm",
      fontWeight: "bold",
      letterSpacing: "widest",
      textTransform: "uppercase",
    },
    heading: {
      fontSize: { base: "2.75rem", md: "3.5rem" },
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      textAlign: "center",
    },
    "heading-2": {
      fontSize: { base: "2.5rem", md: "2.75rem" },
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      textAlign: "center",
    },
  },
})
