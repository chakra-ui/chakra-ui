import { switchAnatomy as parts } from "@chakra-ui/anatomy"
import {
  calc,
  cssVar,
  mode,
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"

const sliderWidth = cssVar("slider-track-width")
const sliderHeight = cssVar("slider-track-height")

const sliderDiff = cssVar("slider-track-diff")
const sliderDiffValue = calc(sliderWidth).subtract(sliderHeight).toString()

const sliderX = cssVar("slider-thumb-x")

const baseStyleTrack: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    borderRadius: "full",
    p: "2px",
    width: [sliderWidth.reference],
    height: [sliderHeight.reference],
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
  width: [sliderWidth.reference],
  height: [sliderHeight.reference],
  _checked: {
    transform: `translateX(${sliderX.reference})`,
  },
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  container: {
    [sliderDiff.variable]: sliderDiffValue,
    [sliderX.variable]: sliderDiff.reference,
    _rtl: {
      [sliderX.variable]: calc(sliderDiff).negate().toString(),
    },
  },
  track: baseStyleTrack(props),
  thumb: baseStyleThumb,
})

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    container: {
      [sliderWidth.variable]: "1.375rem",
      [sliderHeight.variable]: "0.75rem",
    },
  },
  md: {
    container: {
      [sliderWidth.variable]: "1.875rem",
      [sliderHeight.variable]: "1rem",
    },
  },
  lg: {
    container: {
      [sliderWidth.variable]: "2.875rem",
      [sliderHeight.variable]: "1.5rem",
    },
  },
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
}

export default {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}
