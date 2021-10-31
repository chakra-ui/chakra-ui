import { sliderAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  StyleFunctionProps,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { mode, orient } from "@chakra-ui/theme-tools"

function thumbOrientation(props: StyleFunctionProps): SystemStyleObject {
  return orient({
    orientation: props.orientation,
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
}

const baseStyleContainer: SystemStyleFunction = (props) => {
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
}

const baseStyleTrack: SystemStyleFunction = (props) => {
  return {
    overflow: "hidden",
    borderRadius: "sm",
    bg: mode("gray.200", "whiteAlpha.200")(props),
    _disabled: {
      bg: mode("gray.300", "whiteAlpha.300")(props),
    },
  }
}

const baseStyleThumb: SystemStyleFunction = (props) => {
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
    _focus: { boxShadow: "outline" },
    _disabled: { bg: "gray.300" },
    ...thumbOrientation(props),
  }
}

const baseStyleFilledTrack: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    width: "inherit",
    height: "inherit",
    bg: mode(`${c}.500`, `${c}.200`)(props),
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  container: baseStyleContainer(props),
  track: baseStyleTrack(props),
  thumb: baseStyleThumb(props),
  filledTrack: baseStyleFilledTrack(props),
})

const sizeLg: PartsStyleFunction<typeof parts> = (props) => {
  return {
    thumb: { w: "16px", h: "16px" },
    track: orient({
      orientation: props.orientation,
      horizontal: { h: "4px" },
      vertical: { w: "4px" },
    }),
  }
}

const sizeMd: PartsStyleFunction<typeof parts> = (props) => {
  return {
    thumb: { w: "14px", h: "14px" },
    track: orient({
      orientation: props.orientation,
      horizontal: { h: "4px" },
      vertical: { w: "4px" },
    }),
  }
}

const sizeSm: PartsStyleFunction<typeof parts> = (props) => {
  return {
    thumb: { w: "10px", h: "10px" },
    track: orient({
      orientation: props.orientation,
      horizontal: { h: "2px" },
      vertical: { w: "2px" },
    }),
  }
}

const sizes = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm,
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
}

export default {
  parts: parts.keys,
  sizes,
  baseStyle,
  defaultProps,
}
