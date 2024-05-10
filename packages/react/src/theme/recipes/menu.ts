import { anatomy as parts } from "@ark-ui/anatomy/menu"
import { defineSlotRecipe } from "../../styled-system"

export const menuSlotRecipe = defineSlotRecipe({
  slots: [...parts.keys(), "itemCommand"],
  base: {
    content: {
      outline: 0,
      bg: "bg.panel",
      boxShadow: "sm",
      color: "inherit",
      minW: "8rem",
      padding: "1",
      zIndex: "dropdown",
      borderRadius: "md",
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
    itemText: {
      flex: "1",
    },
    itemGroupLabel: {
      px: "2",
      py: "1.5",
      fontWeight: "medium",
      fontSize: "sm",
    },
    indicator: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
    },
    itemCommand: {
      opacity: "0.6",
      marginLeft: "auto",
    },
    separator: {
      height: "1px",
      bg: "bg.muted",
      my: "1",
      mx: "-1",
    },
  },
  variants: {
    variant: {
      subtle: {
        item: {
          _highlighted: {
            bg: { base: "gray.100", _dark: "whiteAlpha.100" },
          },
        },
      },
      solid: {
        item: {
          _highlighted: {
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
