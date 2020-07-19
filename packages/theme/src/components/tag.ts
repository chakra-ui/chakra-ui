import { styleConfig } from "@chakra-ui/theme-tools"
import badge from "./badge"

const tag = styleConfig({
  parts: {
    container: "the tag container",
    label: "the tag inner text",
    closeButton: "the close button",
  },

  baseStyle: {
    container: {
      outline: 0,
      _focus: {
        boxShadow: "outline",
      },
    },
    label: { lineHeight: 1.2 },
    closeButton: {
      fontSize: "1em",
      width: "1.25rem",
      height: "1.25rem",
      borderRadius: "sm",
      marginLeft: "0.375rem",
      opacity: 0.5,
      _disabled: { opacity: 0.4 },
      _focus: {
        boxShadow: "outline",
        bg: "rgba(0, 0, 0, 0.14)",
      },
      _hover: { opacity: 0.8 },
      _active: { opacity: 1 },
    },
  },

  sizes: {
    sm: {
      container: {
        minHeight: "1.25rem",
        minWidth: "1.25rem",
        fontSize: "xs",
        paddingX: 1,
        borderRadius: "sm",
      },
    },
    md: {
      container: {
        minHeight: "1.5rem",
        minWidth: "1.5rem",
        fontSize: "sm",
        borderRadius: "md",
        paddingX: 2,
      },
    },
    lg: {
      container: {
        minHeight: 8,
        minWidth: 8,
        fontSize: "md",
        borderRadius: "md",
        paddingX: 3,
      },
    },
  },

  variants: badge.variants,

  defaultProps: {
    size: "lg",
    variant: "subtle",
    colorScheme: "gray",
  },
})

export default tag
