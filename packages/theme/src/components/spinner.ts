import { styleConfig } from "@chakra-ui/theme-tools"

const spinner = styleConfig({
  parts: {
    spinner: "the spinner",
  },
  sizes: {
    xs: {
      spinner: { w: "0.75rem", h: "0.75rem" },
    },
    sm: {
      spinner: { w: "1rem", h: "1rem" },
    },
    md: {
      spinner: { w: "1.5rem", h: "1.5rem" },
    },
    lg: {
      spinner: { w: "2rem", h: "2rem" },
    },
    xl: {
      spinner: { w: "3rem", h: "3rem" },
    },
  },

  defaultProps: {
    size: "md",
  },
})

export default spinner
