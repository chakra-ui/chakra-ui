import { cssVar, SystemStyleObject } from "@chakra-ui/theme-tools"

const spinnerSize = cssVar("spinner-size")

const baseStyle: SystemStyleObject = {
  width: [spinnerSize.reference],
  height: [spinnerSize.reference],
}

const sizes: Record<string, SystemStyleObject> = {
  xs: {
    [spinnerSize.variable]: "0.75rem",
  },
  sm: {
    [spinnerSize.variable]: "1rem",
  },
  md: {
    [spinnerSize.variable]: "1.5rem",
  },
  lg: {
    [spinnerSize.variable]: "2rem",
  },
  xl: {
    [spinnerSize.variable]: "3rem",
  },
}

const defaultProps = {
  size: "md",
}

export default {
  baseStyle,
  sizes,
  defaultProps,
}
