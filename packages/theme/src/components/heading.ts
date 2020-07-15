import { BaseStyle, DefaultProps, Sizes } from "@chakra-ui/theme-tools"

const register = {
  parts: ["heading"],
  sizes: ["2xl", "xl", "lg", "md", "sm", "xs"],
} as const

const baseStyle: BaseStyle<typeof register> = {
  heading: {
    fontFamily: "heading",
    lineHeight: "shorter",
    fontWeight: "bold",
  },
}

const sizes: Sizes<typeof register> = {
  "2xl": {
    heading: { fontSize: ["4xl", null, "5xl"] },
  },
  xl: {
    heading: { fontSize: ["3xl", null, "4xl"] },
  },
  lg: {
    heading: { fontSize: ["xl", null, "2xl"] },
  },
  md: { heading: { fontSize: "xl" } },
  sm: { heading: { fontSize: "md" } },
  xs: { heading: { fontSize: "sm" } },
}

const defaultProps: DefaultProps<typeof register> = {
  size: "xl",
}

const heading = {
  register,
  defaultProps,
  baseStyle,
  sizes,
}

export default heading
