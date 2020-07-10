import { DefaultProps, Sizes } from "@chakra-ui/theme-tools"

const register = {
  parts: ["spinner"],
  sizes: ["xs", "sm", "md", "lg", "xl"],
} as const

const sizes: Sizes<typeof register> = {
  xs: {
    spinner: { width: "0.75rem", height: "0.75rem" },
  },
  sm: {
    spinner: { width: "1rem", height: "1rem" },
  },
  md: {
    spinner: { width: "1.5rem", height: "1.5rem" },
  },
  lg: {
    spinner: { width: "2rem", height: "2rem" },
  },
  xl: {
    spinner: { width: "3rem", height: "3rem" },
  },
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
}

const spinner = {
  register,
  defaultProps,
  sizes,
}

export default spinner
