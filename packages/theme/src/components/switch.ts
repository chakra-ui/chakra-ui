import { switchAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { calc, cssVar } from "@chakra-ui/theme-tools"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $width = cssVar("switch-track-width")
const $height = cssVar("switch-track-height")
const $diff = cssVar("switch-track-diff")
const diffValue = calc.subtract($width, $height)
const $translateX = cssVar("switch-thumb-x")
const $bg = cssVar("switch-bg")

const baseStyleTrack = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    display: "inline-flex",
    gap: "0.5rem",
    flexShrink: 0,
    justifyContent: "flex-start",
    boxSizing: "content-box",
    cursor: "pointer",
    borderRadius: "full",
    p: "0.5",
    width: [$width.reference],
    height: [$height.reference],
    transitionProperty: "common",
    transitionDuration: "fast",
    [$bg.variable]: "colors.gray.300",
    _dark: {
      [$bg.variable]: "colors.whiteAlpha.400",
    },
    _focusVisible: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _checked: {
      [$bg.variable]: `colors.${c}.500`,
      _dark: {
        [$bg.variable]: `colors.${c}.200`,
      },
    },
    bg: $bg.reference,
  }
})

const baseStyleThumb = defineStyle({
  bg: "white",
  transitionProperty: "transform",
  transitionDuration: "normal",
  borderRadius: "inherit",
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    transform: `translateX(${$translateX.reference})`,
  },
})

const baseStyleRoot = defineStyle({
  display: "inline-block",
  position: "relative",
  verticalAlign: "middle",
  lineHeight: 0,
  [$diff.variable]: diffValue,
  [$translateX.variable]: $diff.reference,
  _rtl: {
    [$translateX.variable]: calc($diff).negate().toString(),
  },
})

const baseStyleLabel = defineStyle({
  userSelect: "none",
})

const baseStyle = definePartsStyle((props) => ({
  root: baseStyleRoot,
  track: baseStyleTrack(props),
  thumb: baseStyleThumb,
  label: baseStyleLabel,
}))

const sizes = {
  sm: definePartsStyle({
    root: {
      [$width.variable]: "1.375rem",
      [$height.variable]: "sizes.3",
    },
  }),
  md: definePartsStyle({
    root: {
      [$width.variable]: "1.875rem",
      [$height.variable]: "sizes.4",
    },
  }),
  lg: definePartsStyle({
    root: {
      [$width.variable]: "2.875rem",
      [$height.variable]: "sizes.6",
    },
  }),
}

export const switchTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})
