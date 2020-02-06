import { StyleFunctionProps, getModeColor } from "./utils";

export default {
  baseStyle: (props: StyleFunctionProps) => ({
    Button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "md",
      transition: "all 0.2s",
      flex: "0 0 auto",
      _hover: {
        background: getModeColor(props, `blackAlpha.100`, `whiteAlpha.100`),
      },
      _active: {
        background: getModeColor(props, `blackAlpha.200`, `whiteAlpha.200`),
      },
      _focus: {
        boxShadow: "outline",
      },
    },
  }),
  variantSize: {
    lg: {
      Button: {
        size: "40px",
      },
      Icon: {
        size: "16px",
      },
    },
    md: {
      Button: {
        size: "32px",
      },
      Icon: {
        size: "12px",
      },
    },
    sm: {
      Button: {
        size: "24px",
      },
      Icon: {
        size: "10px",
      },
    },
  },
};
