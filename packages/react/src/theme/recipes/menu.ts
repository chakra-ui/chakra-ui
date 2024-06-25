import { anatomy } from "@ark-ui/anatomy/menu"
import { defineSlotRecipe } from "../../styled-system"

export const menuSlotRecipe = defineSlotRecipe({
  slots: [...anatomy.keys(), "itemCommand"],
  base: {
    content: {
      outline: 0,
      bg: "bg.panel",
      boxShadow: "sm",
      color: "inherit",
      zIndex: "dropdown",
      borderRadius: "md",
      overflow: "hidden",
      colorPalette: "gray",
      _open: {
        motionStyle: "slide-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        motionStyle: "slide-fade-out",
        animationDuration: "faster",
      },
    },
    item: {
      textDecoration: "none",
      color: "inherit",
      userSelect: "none",
      width: "100%",
      display: "flex",
      alignItems: "center",
      textAlign: "start",
      position: "relative",
      flex: "0 0 auto",
      outline: 0,
      _disabled: {
        layerStyle: "disabled",
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
      ms: "auto",
      ps: "4",
      letterSpacing: "0.1em",
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
      sm: {
        content: {
          minW: "8rem",
          padding: "1",
        },
        item: {
          gap: "1",
          fontSize: "xs",
          borderRadius: "sm",
          py: "1",
          px: "1.5",
        },
      },
      md: {
        content: {
          minW: "8rem",
          padding: "1.5",
        },
        item: {
          gap: "2",
          fontSize: "sm",
          borderRadius: "sm",
          py: "1.5",
          px: "2",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "subtle",
    colorPalette: "gray",
  },
})
