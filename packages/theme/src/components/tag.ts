import { tagAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { badgeTheme } from "./badge"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleContainer = defineStyle({
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  borderRadius: "md",
  _focusVisible: {
    boxShadow: "outline",
  },
})

const baseStyleLabel = defineStyle({
  lineHeight: 1.2,
  overflow: "visible",
})

const baseStyleCloseButton = defineStyle({
  fontSize: "lg",
  w: "5",
  h: "5",
  transitionProperty: "common",
  transitionDuration: "normal",
  borderRadius: "full",
  marginStart: "1.5",
  marginEnd: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4,
  },
  _focusVisible: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)",
  },
  _hover: {
    opacity: 0.8,
  },
  _active: {
    opacity: 1,
  },
})

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton,
})

const sizes = {
  sm: definePartsStyle({
    container: {
      minH: "5",
      minW: "5",
      fontSize: "xs",
      px: "2",
    },
    closeButton: {
      marginEnd: "-2px",
      marginStart: "0.35rem",
    },
  }),
  md: definePartsStyle({
    container: {
      minH: "6",
      minW: "6",
      fontSize: "sm",
      px: "2",
    },
  }),
  lg: definePartsStyle({
    container: {
      minH: "8",
      minW: "8",
      fontSize: "md",
      px: "3",
    },
  }),
}

const variants = {
  subtle: definePartsStyle((props) => ({
    container: badgeTheme.variants?.subtle(props),
  })),
  solid: definePartsStyle((props) => ({
    container: badgeTheme.variants?.solid(props),
  })),
  outline: definePartsStyle((props) => ({
    container: badgeTheme.variants?.outline(props),
  })),
}

export const tagTheme = defineMultiStyleConfig({
  variants,
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    variant: "subtle",
    colorScheme: "gray",
  },
})
