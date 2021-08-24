import { cssVar, SystemStyleObject } from "@chakra-ui/theme-tools"

const $size = cssVar("spinner-size")

const baseStyle: SystemStyleObject = {
  width: [$size.reference],
  height: [$size.reference],
}

const sizes: Record<string, SystemStyleObject> = {
  xs: {
    [$size.variable]: "0.75rem",
  },
  sm: {
    [$size.variable]: "1rem",
  },
  md: {
    [$size.variable]: "1.5rem",
  },
  lg: {
    [$size.variable]: "2rem",
  },
  xl: {
    [$size.variable]: "3rem",
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
