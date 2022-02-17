import { avatarAnatomy as parts } from "@chakra-ui/anatomy"
import { isDark, randomColor, SystemStyleObject } from "@chakra-ui/theme-tools"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools"
import themeSizes from "../foundations/sizes"

const baseStyleBadge: SystemStyleObject = {
  transform: "translate(25%, 25%)",
  borderRadius: "full",
  border: "0.2em solid",

  _light: {
    borderColor: "white",
  },

  _dark: {
    borderColor: "gray.800",
  },
}

const baseStyleExcessLabel: SystemStyleObject = {
  _light: {
    bg: "gray.200",
  },

  _dark: {
    bg: "whiteAlpha.400",
  },
}

const baseStyleContainer: SystemStyleFunction = (props) => {
  const { name, theme } = props
  const bg = name ? randomColor({ string: name }) : "gray.400"
  const isBgDark = isDark(bg)(theme)

  let color = "white"
  if (!isBgDark) color = "gray.800"

  const borderColorLight = "white"
  const borderColorDark = "gray.800"

  return {
    bg,
    color,
    verticalAlign: "top",

    _light: {
      borderColor: borderColorLight,
    },

    _dark: {
      borderColor: borderColorDark,
    },
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  badge: baseStyleBadge,
  excessLabel: baseStyleExcessLabel,
  container: baseStyleContainer(props),
})

function getSize(size: string): PartsStyleObject<typeof parts> {
  const themeSize = themeSizes[size]
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
  "2xs": getSize("4"),
  xs: getSize("6"),
  sm: getSize("8"),
  md: getSize("12"),
  lg: getSize("16"),
  xl: getSize("24"),
  "2xl": getSize("32"),
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
