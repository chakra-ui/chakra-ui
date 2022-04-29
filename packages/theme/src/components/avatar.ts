import { avatarAnatomy as parts } from "@chakra-ui/anatomy"
import { mode } from "@chakra-ui/theme-tools"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools"
import themeSizes from "../foundations/sizes"

const baseStyleBadge: SystemStyleFunction = (props) => {
  return {
    transform: "translate(25%, 25%)",
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props),
  }
}

const baseStyleExcessLabel: SystemStyleFunction = (props) => {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props),
  }
}

const baseStyleContainer: SystemStyleFunction = (props) => {
  const { theme } = props

  const colors = Object.keys(theme.colors).filter(
    (c) =>
      ![
        "whiteAlpha",
        "blackAlpha",
        "white",
        "black",
        "transparent",
        "current",
      ].includes(c),
  )

  const bgColor = colors[Math.floor(Math.random() * colors.length)]

  const borderColor = mode("white", "gray.800")(props)

  return {
    bg: mode(`${bgColor}.300`, `${bgColor}.700`)(props),
    color: mode("gray.800", "white")(props),
    borderColor,
    verticalAlign: "top",
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  badge: baseStyleBadge(props),
  excessLabel: baseStyleExcessLabel(props),
  container: baseStyleContainer(props),
})

function getSize(
  size: keyof typeof themeSizes | "100%",
): PartsStyleObject<typeof parts> {
  const themeSize = size !== "100%" ? themeSizes[size] : undefined
  return {
    container: {
      width: size,
      height: size,
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
    },
    excessLabel: {
      width: size,
      height: size,
    },
    label: {
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
      lineHeight: size !== "100%" ? themeSize ?? size : undefined,
    },
  }
}

const sizes = {
  "2xs": getSize(4),
  xs: getSize(6),
  sm: getSize(8),
  md: getSize(12),
  lg: getSize(16),
  xl: getSize(24),
  "2xl": getSize(32),
  full: getSize("100%"),
}

const defaultProps = {
  size: "md",
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
}
