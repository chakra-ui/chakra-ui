import { menuAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const menuSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    content: {
      outline: 0,
      bg: { base: "white", _dark: "gray.700" },
      boxShadow: "sm",
      color: "inherit",
      minW: "8rem",
      padding: "1",
      zIndex: "dropdown",
      borderRadius: "md",
      borderWidth: "1px",
      overflow: "hidden",
      colorPalette: "gray",
    },
    item: {
      textDecoration: "none",
      color: "inherit",
      userSelect: "none",
      width: "100%",
      display: "flex",
      alignItems: "center",
      textAlign: "start",
      gap: "2",
      flex: "0 0 auto",
      outline: 0,
      fontSize: "sm",
      borderRadius: "sm",
      py: "1.5",
      px: "2",
      _disabled: {
        opacity: "0.5",
      },
    },
    groupTitle: {
      px: "2",
      py: "1.5",
      fontWeight: "semibold",
      fontSize: "sm",
    },
    icon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
    },
    command: {
      opacity: "0.6",
    },
    separator: {
      bg: "bg.muted",
      my: "2",
      mx: "-1",
    },
  },
  variants: {
    variant: {
      subtle: {
        item: {
          _focus: {
            bg: { base: "gray.100", _dark: "whiteAlpha.100" },
          },
        },
      },
      solid: {
        item: {
          _focus: {
            bg: "colorPalette.600",
            color: "white",
          },
        },
      },
    },
    size: {
      sm: {},
      md: {},
    },
  },
  defaultVariants: {
    variant: "subtle",
    colorPalette: "gray",
  },
})
