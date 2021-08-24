import { switchAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { calc, cssVar, mode } from "@chakra-ui/theme-tools"

const $width = cssVar("switch-track-width")
const $height = cssVar("switch-track-height")

const $diff = cssVar("switch-track-diff")
const diffValue = calc.subtract($width, $height)

const $translateX = cssVar("switch-thumb-x")

const baseStyleTrack: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    borderRadius: "full",
    p: "2px",
    width: [$width.reference],
    height: [$height.reference],
    transitionProperty: "common",
    transitionDuration: "fast",
    bg: mode("gray.300", "whiteAlpha.400")(props),
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _checked: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

const baseStyleThumb: SystemStyleObject = {
  bg: "white",
  transitionProperty: "transform",
  transitionDuration: "normal",
  borderRadius: "inherit",
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    transform: `translateX(${$translateX.reference})`,
  },
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  container: {
    [$diff.variable]: diffValue,
    [$translateX.variable]: $diff.reference,
    _rtl: {
      [$translateX.variable]: calc($diff).negate().toString(),
    },
  },
  track: baseStyleTrack(props),
  thumb: baseStyleThumb,
})

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    container: {
      [$width.variable]: "1.375rem",
      [$height.variable]: "0.75rem",
    },
  },
  md: {
    container: {
      [$width.variable]: "1.875rem",
      [$height.variable]: "1rem",
    },
  },
  lg: {
    container: {
      [$width.variable]: "2.875rem",
      [$height.variable]: "1.5rem",
    },
  },
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
}
