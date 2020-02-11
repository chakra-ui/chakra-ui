import { StyleFunctionProps, getModeColor } from "./utils";

type SliderStyleProp = StyleFunctionProps & {
  trackPercent?: number;
  thumbSize?: number;
  trackHeight?: number;
};

const centeredProps = {
  position: "absolute",
  top: "50%",
  transform: `translateY(-50%)`,
};

const Slider = {
  variantSize: {
    __default: "md",
    lg: {
      Thumb: { size: "16px" },
      Track: { height: "4px" },
      FilledTrack: { height: "4px" },
    },
    md: {
      Thumb: { size: "14px" },
      Track: { height: "4px" },
      FilledTrack: { height: "4px" },
    },
    sm: {
      Thumb: { size: "10px" },
      Track: { height: "2px" },
      FilledTrack: { height: "2px" },
    },
  },
  baseStyle: (props: SliderStyleProp) => ({
    Root: {
      width: "full",
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      _disabled: {
        opacity: 0.6,
        cursor: "default",
        pointerEvents: "none",
      },
    },
    Track: {
      ...centeredProps,
      height: props.trackHeight,
      borderRadius: "sm",
      width: "100%",
      bg: getModeColor(props, "gray.200", "whiteAlpha.200"),
      _disabled: {
        bg: getModeColor(props, "gray.300", "whiteAlpha.300"),
      },
    },
    Thumb: {
      ...centeredProps,
      zIndex: 1,
      size: props.thumbSize,
      rounded: "full",
      bg: "#fff",
      boxShadow: "sm",
      left: `calc(${props.trackPercent}% - ${props.thumbSize} / 2)`,
      border: "1px",
      borderColor: "transparent",
      transition: "transform 0.2s",
      _focus: {
        boxShadow: "outline",
      },
      _disabled: {
        backgroundColor: "gray.300",
      },
      _active: {
        transform: `translateY(-50%) scale(1.15)`,
      },
    },
    FilledTrack: {
      ...centeredProps,
      height: props.trackHeight,
      bg: getModeColor(
        props,
        `${props.variantColor}.500`,
        `${props.variantColor}.200`,
      ),
      width: `${props.trackPercent}%`,
      rounded: "sm",
    },
  }),
};

export default Slider;
