import { multiStyleConfig } from "@chakra-ui/theme-tools"
import badge from "./badge"

const tag = multiStyleConfig({
  parts: {
    container: "the tag container",
    label: "the tag inner text",
    closeButton: "the close button",
  },

  baseStyle: {
    container: {
      fontWeight: "medium",
      lineHeight: 1.2,
      outline: 0,
      _focus: {
        boxShadow: "outline",
      },
    },
    label: {
      lineHeight: 1.2,
    },
    closeButton: {
      fontSize: "1em",
      width: "1.25rem",
      height: "1.25rem",
      borderRadius: "sm",
      marginLeft: "0.375rem",
      opacity: 0.5,
      _disabled: {
        opacity: 0.4,
      },
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
        minH: "1.25rem",
        minW: "1.25rem",
        fontSize: "xs",
        px: 1,
        borderRadius: "sm",
      },
    },
    md: {
      container: {
        minH: "1.5rem",
        minW: "1.5rem",
        fontSize: "sm",
        borderRadius: "md",
        px: 2,
      },
    },
    lg: {
      container: {
        minH: 8,
        minW: 8,
        fontSize: "md",
        borderRadius: "md",
        px: 3,
      },
    },
  },

  variants: {
    subtle: function (props) {
      return { container: badge.variants?.subtle(props) }
    },
    solid: function (props) {
      return { container: badge.variants?.solid(props) }
    },
    outline: function (props) {
      return { container: badge.variants?.outline(props) }
    },
  },

  defaultProps: {
    size: "lg",
    variant: "subtle",
    colorScheme: "gray",
  },
})

export default tag
