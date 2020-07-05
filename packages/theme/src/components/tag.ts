import { ComponentTheme } from "@chakra-ui/theme-tools"
import Badge, { BadgeVariants } from "./badge"

const Tag = {
  defaultProps: {
    size: "lg",
    variant: "subtle",
    colorScheme: "gray",
  },
  baseStyle: {
    Container: {
      outline: 0,
      _focus: {
        boxShadow: "outline",
      },
    },
    Label: {
      lineHeight: 1.2,
    },
    CloseButton: {
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
      Container: {
        minHeight: "1.25rem",
        minWidth: "1.25rem",
        fontSize: "xs",
        paddingX: 1,
        borderRadius: "sm",
      },
    },
    md: {
      Container: {
        minHeight: "1.5rem",
        minWidth: "1.5rem",
        fontSize: "sm",
        borderRadius: "md",
        paddingX: 2,
      },
    },
    lg: {
      Container: {
        minHeight: 8,
        minWidth: 8,
        fontSize: "md",
        borderRadius: "md",
        paddingX: 3,
      },
    },
  },
  variants: Badge.variants,
}

export const TagSizes = {
  sm: "sm",
  md: "md",
  lg: "lg",
}

export const TagVariants = BadgeVariants

export default Tag
