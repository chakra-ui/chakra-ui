import { Props, getModeColor, ComponentTheme } from "./utils"

const CloseButton: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: (props: Props) => ({
    Button: {
      borderRadius: "md",
      transition: "all 0.2s",
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
  sizes: {
    lg: {
      Button: {
        width: "40px",
        height: "40px",
      },
      Icon: {
        width: "16px",
        height: "16px",
      },
    },
    md: {
      Button: {
        width: "32px",
        height: "32px",
      },
      Icon: {
        width: "12px",
        height: "12px",
      },
    },
    sm: {
      Button: {
        width: "24px",
        height: "24px",
      },
      Icon: {
        width: "10px",
        height: "10px",
      },
    },
  },
}

export default CloseButton
