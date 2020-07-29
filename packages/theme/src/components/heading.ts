import { styleConfig } from "@chakra-ui/theme-tools"

const baseStyle = {
  fontFamily: "heading",
  lineHeight: "shorter",
  fontWeight: "bold",
}

const sizes = {
  "2xl": {
    fontSize: ["4xl", null, "5xl"],
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
  },
  md: { fontSize: "xl" },
  sm: { fontSize: "md" },
  xs: { fontSize: "sm" },
}

const defaultProps = {
  size: "xl",
}

const heading = styleConfig({
  baseStyle,
  sizes,
  // @ts-ignore
  defaultProps,
})

export const headingStyles = {
  baseStyle,
  sizes,
}

export default heading
