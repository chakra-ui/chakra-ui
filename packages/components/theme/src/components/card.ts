import { cardAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, cssVar } from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar("card-bg")
const $padding = cssVar("card-padding")

const baseStyle = definePartsStyle({
  container: {
    [$bg.variable]: "chakra-body-bg",
    backgroundColor: $bg.reference,
    color: "chakra-body-text",
  },
  body: {
    padding: $padding.reference,
    flex: "1 1 0%",
  },
  header: {
    padding: $padding.reference,
  },
  footer: {
    padding: $padding.reference,
  },
})

const sizes = {
  sm: definePartsStyle({
    container: {
      borderRadius: "base",
      [$padding.variable]: "space.3",
    },
  }),
  md: definePartsStyle({
    container: {
      borderRadius: "md",
      [$padding.variable]: "space.5",
    },
  }),
  lg: definePartsStyle({
    container: {
      borderRadius: "xl",
      [$padding.variable]: "space.7",
    },
  }),
}

const variants = {
  elevated: definePartsStyle({
    container: {
      boxShadow: "base",
      _dark: {
        [$bg.variable]: "colors.gray.700",
      },
    },
  }),
  outline: definePartsStyle({
    container: {
      borderWidth: "1px",
      borderColor: "chakra-border-color",
    },
  }),
  filled: definePartsStyle({
    container: {
      [$bg.variable]: "colors.chakra-subtle-bg",
    },
  }),
  unstyled: {
    body: { padding: 0 },
    header: { padding: 0 },
    footer: { padding: 0 },
  },
}

export const cardTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "elevated",
    size: "md",
  },
})
