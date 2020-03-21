import {
  ComponentTheme,
  getModeColor as get,
  getOrientationStyle,
} from "./utils"

const Slider: ComponentTheme = {
  variantSize: {
    __default: "md",
    lg: props => ({
      Thumb: { size: "16px" },
      Track: getOrientationStyle({
        orientation: props.orientation,
        horizontal: { height: "4px" },
        vertical: { width: "4px" },
      }),
    }),
    md: props => ({
      Thumb: { size: "14px" },
      Track: getOrientationStyle({
        orientation: props.orientation,
        horizontal: { height: "4px" },
        vertical: { width: "4px" },
      }),
    }),
    sm: props => ({
      Thumb: { size: "10px" },
      Track: getOrientationStyle({
        orientation: props.orientation,
        horizontal: { height: "2px" },
        vertical: { width: "2px" },
      }),
    }),
  },
  baseStyle: props => ({
    Root: {
      _disabled: {
        opacity: 0.6,
        cursor: "default",
        pointerEvents: "none",
      },
      ...getOrientationStyle({
        orientation: props.orientation,
        vertical: { height: "100%" },
        horizontal: { width: "100%" },
      }),
    },
    Track: {
      borderRadius: "sm",
      bg: get(props, "gray.200", "whiteAlpha.200"),
      _disabled: {
        bg: get(props, "gray.300", "whiteAlpha.300"),
      },
    },
    Thumb: {
      zIndex: 1,
      borderRadius: "full",
      bg: "white",
      boxShadow: "sm",
      border: "1px solid",
      borderColor: "transparent",
      transition: "transform 0.2s",
      _focus: {
        boxShadow: "outline",
      },
      _disabled: {
        backgroundColor: "gray.300",
      },
      ...getOrientationStyle({
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
      }),
    },
    FilledTrack: {
      bg: get(props, `${props.variantColor}.500`, `${props.variantColor}.200`),
    },
  }),
}

export default Slider
