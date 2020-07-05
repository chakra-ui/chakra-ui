import { ComponentTheme } from "@chakra-ui/theme-tools"

const Spinner: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  sizes: {
    xs: {
      Container: {
        width: "0.75rem",
        height: "0.75rem",
      },
    },
    sm: {
      Container: {
        width: "1rem",
        height: "1rem",
      },
    },
    md: {
      Container: {
        width: "1.5rem",
        height: "1.5rem",
      },
    },
    lg: {
      Container: {
        width: "2rem",
        height: "2rem",
      },
    },
    xl: {
      Container: {
        width: "3rem",
        height: "3rem",
      },
    },
  },
}

export const SpinnerSizes = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
}

export default Spinner
