import { menuAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const menuSlotRecipe = defineSlotRecipe({
  className: "chakra-menu",
  slots: menuAnatomy.keys(),
  base: {
    content: {
      outline: 0,
      bg: "bg.panel",
      boxShadow: "sm",
      color: "inherit",
      zIndex: "dropdown",
      borderRadius: "md",
      overflow: "hidden",
      _open: {
        animationStyle: "slide-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        animationStyle: "slide-fade-out",
        animationDuration: "faster",
      },
    },
    item: {
      textDecoration: "none",
      color: "inherit",
      userSelect: "none",
      width: "100%",
      display: "flex",
      cursor: "menuitem",
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
      textStyle: "sm",
    },
    indicator: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
    },
    itemCommand: {
      opacity: "0.6",
      textStyle: "xs",
      ms: "auto",
      ps: "4",
      letterSpacing: "widest",
    },
    separator: {
      height: "1px",
      bg: "bg.subtle",
      my: "1",
      mx: "-1",
    },
  },

  variants: {
    variant: {
      subtle: {
        item: {
          _highlighted: {
            bg: { _light: "bg.subtle", _dark: "bg.emphasized" },
          },
        },
      },
      solid: {
        item: {
          _highlighted: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
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
          textStyle: "xs",
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
          textStyle: "sm",
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
  },
})
