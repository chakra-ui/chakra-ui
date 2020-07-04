import { ComponentTheme, mode } from "@chakra-ui/theme-tools"

const CloseButton: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: (props) => ({
    Icon: {},
    Container: {
      borderRadius: "md",
      transition: "all 0.2s",
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        boxShadow: "none",
      },
      _hover: {
        bg: mode(`blackAlpha.100`, `whiteAlpha.100`)(props),
      },
      _active: {
        bg: mode(`blackAlpha.200`, `whiteAlpha.200`)(props),
      },
      _focus: {
        boxShadow: "outline",
      },
    },
  }),
  sizes: {
    lg: {
      Container: {
        width: "40px",
        height: "40px",
      },
      Icon: {
        fontSize: "16px",
      },
    },
    md: {
      Container: {
        width: "32px",
        height: "32px",
      },
      Icon: {
        fontSize: "12px",
      },
    },
    sm: {
      Container: {
        width: "24px",
        height: "24px",
      },
      Icon: {
        fontSize: "10px",
      },
    },
  },
}

export const CloseButtonSizes = {
  lg: "lg",
  sm: "sm",
  md: "md",
}

export default CloseButton
