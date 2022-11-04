import { cardAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "md",
  },
  body: {
    paddingX: "6",
    paddingY: "4",
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
    },
  }),
  outline: definePartsStyle({}),
  filled: definePartsStyle({}),
}

export const cardTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "elevated",
  },
})
