import {
  BaseStyle,
  DefaultProps,
  isDark,
  mode,
  randomColor,
  Sizes,
} from "@chakra-ui/theme-tools"
import themeSizes from "../foundations/sizes"

const register = {
  parts: ["container", "excessLabel", "badge", "label"],
  sizes: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "full"],
} as const

const baseStyle: BaseStyle<typeof register> = function (props) {
  const { name, theme } = props
  const bg = name ? randomColor({ string: name }) : "gray.400"
  const color = name ? (isDark(bg)(theme) ? "white" : "gray.800") : "white"
  const borderColor = mode("white", "gray.800")(props)

  return {
    badge: {
      transform: "translate(25%, 25%)",
      borderRadius: "full",
      border: "0.2em solid",
      borderColor: mode("white", "gray.800")(props),
    },
    excessLabel: {
      bg: mode("gray.200", "whiteAlpha.400")(props),
    },
    container: {
      bg,
      color,
      borderColor,
      verticalAlign: "top",
    },
  }
}

const sizes: Sizes<typeof register> = {
  "2xs": getSize("4"),
  xs: getSize("6"),
  sm: getSize("8"),
  md: getSize("12"),
  lg: getSize("16"),
  xl: getSize("24"),
  "2xl": getSize("32"),
  full: getSize("100%"),
}

function getSize(size: string) {
  const themeSize = themeSizes[size as keyof typeof sizes]
  const styles = { width: size, height: size }
  return {
    container: {
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
      ...styles,
    },
    excessLabel: styles,
    label: {
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
      lineHeight: size !== "100%" ? themeSize ?? size : undefined,
    },
  }
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
}

const avatar = {
  register,
  defaultProps,
  baseStyle,
  sizes,
}

export default avatar
