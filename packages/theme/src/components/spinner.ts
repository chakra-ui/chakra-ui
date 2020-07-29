import { styleConfig } from "@chakra-ui/theme-tools"

const sizes = {
  xs: {
    w: "0.75rem",
    h: "0.75rem",
  },
  sm: {
    w: "1rem",
    h: "1rem",
  },
  md: {
    w: "1.5rem",
    h: "1.5rem",
  },
  lg: {
    w: "2rem",
    h: "2rem",
  },
  xl: {
    w: "3rem",
    h: "3rem",
  },
}

const defaultProps = {
  size: "md",
}

const spinner = styleConfig({
  sizes,
  // @ts-ignore
  defaultProps,
})

export const spinnerStyles = {
  sizes,
  defaultProps,
}

export default spinner
