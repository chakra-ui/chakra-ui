import { sliderAnatomy as parts } from "@chakra-ui/anatomy"
import {
  calc,
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"
import { orient } from "@chakra-ui/theme-tools"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $thumbSize = cssVar("slider-thumb-size")
const $trackSize = cssVar("slider-track-size")
const $bg = cssVar("slider-bg")

const baseStyleContainer = defineStyle((props) => {
  const { orientation } = props

  return {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none",
    },
    ...orient({
      orientation,
      vertical: {
        h: "100%",
        px: calc($thumbSize.reference).divide(2).toString(),
      },
      horizontal: {
        w: "100%",
        py: calc($thumbSize.reference).divide(2).toString(),
      },
    }),
  }
})

const baseStyleTrack = defineStyle((props) => {
  const orientationStyles = orient({
    orientation: props.orientation,
    horizontal: { h: $trackSize.reference },
    vertical: { w: $trackSize.reference },
  })

  return {
    ...orientationStyles,
    overflow: "hidden",
    borderRadius: "sm",
    [$bg.variable]: "colors.gray.200",
    _dark: {
      [$bg.variable]: "colors.whiteAlpha.200",
    },
    _disabled: {
      [$bg.variable]: "colors.gray.300",
      _dark: {
        [$bg.variable]: "colors.whiteAlpha.300",
      },
    },
    bg: $bg.reference,
  }
})

const baseStyleThumb = defineStyle((props) => {
  const { orientation } = props
  const orientationStyle = orient({
    orientation,
    vertical: { left: "50%" },
    horizontal: { top: "50%" },
  })

  return {
    ...orientationStyle,
    w: $thumbSize.reference,
    h: $thumbSize.reference,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transitionProperty: "transform",
    transitionDuration: "normal",
    _focusVisible: {
      boxShadow: "outline",
    },
    _active: {
      "--slider-thumb-scale": `1.15`,
    },
    _disabled: {
      bg: "gray.300",
    },
  }
})

const baseStyleFilledTrack = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    width: "inherit",
    height: "inherit",
    [$bg.variable]: `colors.${c}.500`,
    _dark: {
      [$bg.variable]: `colors.${c}.200`,
    },
    bg: $bg.reference,
  }
})

const baseStyle = definePartsStyle((props) => ({
  container: baseStyleContainer(props),
  track: baseStyleTrack(props),
  thumb: baseStyleThumb(props),
  filledTrack: baseStyleFilledTrack(props),
}))

const sizeLg = definePartsStyle({
  container: {
    [$thumbSize.variable]: `sizes.4`,
    [$trackSize.variable]: `sizes.1`,
  },
})

const sizeMd = definePartsStyle({
  container: {
    [$thumbSize.variable]: `sizes.3.5`,
    [$trackSize.variable]: `sizes.1`,
  },
})

const sizeSm = definePartsStyle({
  container: {
    [$thumbSize.variable]: `sizes.2.5`,
    [$trackSize.variable]: `sizes.0.5`,
  },
})

const sizes = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm,
}

export const sliderTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})
