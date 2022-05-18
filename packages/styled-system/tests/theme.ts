import { resolveStyleConfig, toCSSVar } from "../src"

export const createTheme = (direction: "rtl" | "ltr") =>
  toCSSVar({
    direction,
    breakpoints: {
      sm: "40em",
      md: "52em",
      lg: "64em",
      xl: "80em",
    },
    space: {
      sm: 40,
      md: 64,
      lg: 80,
    },
    sizes: {
      sm: "40px",
      md: "90px",
    },
    colors: {
      pinkish: "#dfsdds",
      redish: "#rrtffg",
    },
  })

export const theme = createTheme("ltr")

export const recipe = resolveStyleConfig({
  baseStyle: {
    lineHeight: "1.2",
    borderRadius: "md",
    fontWeight: "semibold",
  },

  variants: {
    solid: {
      color: "white",
      backgroundColor: "green.500",
    },

    outline: {
      color: "green.400",
      bg: "transparent",
      border: "1px solid",
      borderColor: "currentColor",
    },

    link: {
      padding: 0,
      height: "auto",
      lineHeight: "normal",
      verticalAlign: "baseline",
      color: "green.500",
      _hover: {
        textDecoration: "underline",
        _disabled: {
          textDecoration: "none",
        },
      },
      _active: {
        color: "green.700",
      },
    },

    unstyled: {
      bg: "none",
      color: "inherit",
      display: "inline",
      lineHeight: "inherit",
      m: 0,
      p: 0,
    },
  },

  sizes: {
    lg: {
      h: 12,
      minW: 12,
      fontSize: "lg",
      px: 6,
    },
    md: {
      h: 10,
      minW: 10,
      fontSize: "md",
      px: 4,
    },
    sm: {
      h: 8,
      minW: 8,
      fontSize: "sm",
      px: 3,
    },
    xs: {
      h: 6,
      minW: 6,
      fontSize: "xs",
      px: 2,
    },
  },
})
