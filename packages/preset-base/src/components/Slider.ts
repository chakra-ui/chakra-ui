import { StyleFunctionProps, getModeColor } from "./utils";

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
  baseStyle: (props: StyleFunctionProps) => ({
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
      rounded: "full",
      bg: "#fff",
      boxShadow: "sm",
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
      bg: getModeColor(
        props,
        `${props.variantColor}.500`,
        `${props.variantColor}.200`,
      ),
      rounded: "sm",
    },
  }),
};

export default Slider;
