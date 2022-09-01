import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
  opacity: 0.6,
  borderColor: "inherit",
})

const variantSolid = defineStyle({
  borderStyle: "solid",
})

const variantDashed = defineStyle({
  borderStyle: "dashed",
})

const variants = {
  solid: variantSolid,
  dashed: variantDashed,
}

export const dividerTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "solid",
  },
})
