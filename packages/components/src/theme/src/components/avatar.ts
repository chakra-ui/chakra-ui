import { avatarAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"
import { isDark, randomColor } from "@chakra-ui/theme-tools"
import themeSizes from "../foundations/sizes"
import { runIfFn } from "../utils/run-if-fn"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $border = cssVar("avatar-border-color")
const $bg = cssVar("avatar-bg")
const $fs = cssVar("avatar-font-size")
const $size = cssVar("avatar-size")

const baseStyleBadge = defineStyle({
  borderRadius: "full",
  border: "0.2em solid",
  borderColor: $border.reference,
  [$border.variable]: "white",
  _dark: {
    [$border.variable]: "colors.gray.800",
  },
})

const baseStyleExcessLabel = defineStyle({
  bg: $bg.reference,
  fontSize: $fs.reference,
  width: $size.reference,
  height: $size.reference,
  lineHeight: "1",
  [$bg.variable]: "colors.gray.200",
  _dark: {
    [$bg.variable]: "colors.whiteAlpha.400",
  },
})

const baseStyleContainer = defineStyle((props) => {
  const { name, theme } = props
  const bg = name ? randomColor({ string: name }) : "colors.gray.400"
  const isBgDark = isDark(bg)(theme)

  let color = "white"
  if (!isBgDark) color = "gray.800"

  return {
    bg: $bg.reference,
    fontSize: $fs.reference,
    color,
    borderColor: $border.reference,
    verticalAlign: "top",
    width: $size.reference,
    height: $size.reference,
    "&:not([data-loaded])": {
      [$bg.variable]: bg,
    },
    [$border.variable]: "colors.white",
    _dark: {
      [$border.variable]: "colors.gray.800",
    },
  }
})

const baseStyleLabel = defineStyle({
  fontSize: $fs.reference,
  lineHeight: "1",
})

const baseStyle = definePartsStyle((props) => ({
  badge: runIfFn(baseStyleBadge, props),
  excessLabel: runIfFn(baseStyleExcessLabel, props),
  container: runIfFn(baseStyleContainer, props),
  label: baseStyleLabel,
}))

function getSize(size: keyof typeof themeSizes | "100%") {
  const themeSize = size !== "100%" ? themeSizes[size] : undefined
  return definePartsStyle({
    container: {
      [$size.variable]: themeSize ?? size,
      [$fs.variable]: `calc(${themeSize ?? size} / 2.5)`,
    },
    excessLabel: {
      [$size.variable]: themeSize ?? size,
      [$fs.variable]: `calc(${themeSize ?? size} / 2.5)`,
    },
  })
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

export const avatarTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
  },
})
