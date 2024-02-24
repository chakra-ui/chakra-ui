import { tagAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"
import { badgeTheme, badgeVars } from "./badge"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar("tag-bg")
const $color = cssVar("tag-color")
const $shadow = cssVar("tag-shadow")
const $minH = cssVar("tag-min-height")
const $minW = cssVar("tag-min-width")
const $fontSize = cssVar("tag-font-size")
const $paddingX = cssVar("tag-padding-inline")

const baseStyleRoot = defineStyle({
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  display: "inline-flex",
  verticalAlign: "top",
  gap: "0.5rem",
  alignItems: "center",
  maxWidth: "100%",
  [$color.variable]: badgeVars.color.reference,
  [$bg.variable]: badgeVars.bg.reference,
  [$shadow.variable]: badgeVars.shadow.reference,
  color: $color.reference,
  bg: $bg.reference,
  boxShadow: $shadow.reference,
  borderRadius: "md",
  minH: $minH.reference,
  minW: $minW.reference,
  fontSize: $fontSize.reference,
  px: $paddingX.reference,
  _focusVisible: {
    [$shadow.variable]: "shadows.outline",
  },
})

const baseStyleLabel = defineStyle({
  lineHeight: 1.2,
  overflow: "visible",
})

const baseStyleCloseTrigger = defineStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  outline: "0",
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
  root: baseStyleRoot,
  label: baseStyleLabel,
  closeTrigger: baseStyleCloseTrigger,
})

const sizes = {
  sm: definePartsStyle({
    root: {
      [$minH.variable]: "sizes.5",
      [$minW.variable]: "sizes.5",
      [$fontSize.variable]: "fontSizes.xs",
      [$paddingX.variable]: "space.2",
    },
    closeTrigger: {
      marginEnd: "-2px",
      marginStart: "0.35rem",
    },
  }),
  md: definePartsStyle({
    root: {
      [$minH.variable]: "sizes.6",
      [$minW.variable]: "sizes.6",
      [$fontSize.variable]: "fontSizes.sm",
      [$paddingX.variable]: "space.2",
    },
  }),
  lg: definePartsStyle({
    root: {
      [$minH.variable]: "sizes.8",
      [$minW.variable]: "sizes.8",
      [$fontSize.variable]: "fontSizes.md",
      [$paddingX.variable]: "space.3",
    },
  }),
}

const variants = {
  subtle: definePartsStyle((props) => ({
    root: badgeTheme.variants?.subtle(props),
  })),
  solid: definePartsStyle((props) => ({
    root: badgeTheme.variants?.solid(props),
  })),
  outline: definePartsStyle((props) => ({
    root: badgeTheme.variants?.outline(props),
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
