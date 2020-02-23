import { ComponentTheme, getModeColor as get } from "./utils"

const Slider: ComponentTheme = {
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
  baseStyle: (props: any) => ({
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
      borderRadius: "sm",
      width: "100%",
      bg: get(props, "gray.200", "whiteAlpha.200"),
      _disabled: {
        bg: get(props, "gray.300", "whiteAlpha.300"),
      },
    },
    Thumb: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      transform: `translateY(-50%)`,
      zIndex: 1,
      borderRadius: "full",
      bg: "#fff",
      boxShadow: "sm",
      outline: 0,
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
      bg: get(props, `${props.variantColor}.500`, `${props.variantColor}.200`),
      borderRadius: "sm",
    },
  }),
}

export default Slider
