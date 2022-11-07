import { cardAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, cssVar } from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar("card-bg")

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "md",
    [$bg.variable]: "chakra-body-bg",
    backgroundColor: $bg.reference,
    color: "chakra-body-text",
  },
  body: {
    paddingX: "6",
    paddingY: "4",
    flex: "1 1 0%",
  },
  header: {
    paddingX: "6",
    paddingY: "4",
  },
  footer: {
    paddingX: "6",
    paddingY: "4",
  },
})

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
      [$bg.variable]: "colors.chakra-subtle",
    },
  }),
}

export const cardTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "elevated",
  },
})
