import { sliderAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { mode, orient } from "@chakra-ui/theme-tools"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

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
      vertical: { h: "100%" },
      horizontal: { w: "100%" },
    }),
  }
})

const baseStyleTrack = defineStyle((props) => {
  return {
    overflow: "hidden",
    borderRadius: "sm",
    bg: mode("gray.200", "whiteAlpha.200")(props),
    _disabled: {
      bg: mode("gray.300", "whiteAlpha.300")(props),
    },
  }
})

const baseStyleThumb = defineStyle((props) => {
  const { orientation } = props
  const orientationStyle = orient({
    orientation,
    vertical: {
      left: "50%",
      transform: `translateX(-50%)`,
      _active: {
        transform: `translateX(-50%) scale(1.15)`,
      },
    },
    horizontal: {
      top: "50%",
      transform: `translateY(-50%)`,
      _active: {
        transform: `translateY(-50%) scale(1.15)`,
      },
    },
  })

  return {
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
    _focusVisible: { boxShadow: "outline" },
    _disabled: { bg: "gray.300" },
    ...orientationStyle,
  }
})

const baseStyleFilledTrack = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    width: "inherit",
    height: "inherit",
    bg: mode(`${c}.500`, `${c}.200`)(props),
  }
})

const baseStyle = definePartsStyle((props) => ({
  container: baseStyleContainer(props),
  track: baseStyleTrack(props),
  thumb: baseStyleThumb(props),
  filledTrack: baseStyleFilledTrack(props),
}))

const sizeLg = definePartsStyle((props) => {
  return {
    thumb: { w: "16px", h: "16px" },
    track: orient({
      orientation: props.orientation,
      horizontal: { h: "4px" },
      vertical: { w: "4px" },
    }),
  }
})

const sizeMd = definePartsStyle((props) => {
  return {
    thumb: { w: "14px", h: "14px" },
    track: orient({
      orientation: props.orientation,
      horizontal: { h: "4px" },
      vertical: { w: "4px" },
    }),
  }
})

const sizeSm = definePartsStyle((props) => {
  return {
    thumb: { w: "10px", h: "10px" },
    track: orient({
      orientation: props.orientation,
      horizontal: { h: "2px" },
      vertical: { w: "2px" },
    }),
  }
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
