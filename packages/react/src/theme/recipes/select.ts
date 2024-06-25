import { selectAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const selectSlotRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  base: {
    root: {
      colorPalette: "gray",
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "full",
      userSelect: "none",
      _placeholderShown: {
        color: "fg.subtle",
      },
      _disabled: {
        layerStyle: "disabled",
      },
      _invalid: {
        borderColor: "var(--error-color)",
      },
      focusRing: "extend",
    },
    indicator: {
      "& svg": {
        width: "4",
        height: "4",
      },
    },
    content: {
      background: "bg.panel",
      display: "flex",
      flexDirection: "column",
      zIndex: "dropdown",
      outline: 0,
      maxH: "96",
      overflowY: "auto",
      _open: {
        motionStyle: "slide-fade-in",
        animationDuration: "faster",
      },
      _closed: {
        animationName: "fade-out",
        animationDuration: "0.01s",
      },
    },
    item: {
      position: "relative",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      gap: "2",
      justifyContent: "space-between",
      flex: "1",
      textAlign: "start",
      _highlighted: {
        bg: "bg.muted",
      },
      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
      "& :where(svg)": {
        width: "4",
        height: "4",
      },
    },
    itemText: {
      flex: "1",
    },
    itemGroupLabel: {
      fontWeight: "medium",
    },
    label: {
      fontWeight: "medium",
      userSelect: "none",
    },
    valueText: {
      lineClamp: "1",
    },
  },

  variants: {
    variant: {
      outline: {
        trigger: {
          borderWidth: "1px",
          borderColor: "inherit",
          bg: "bg",
          _hover: {
            bg: { base: "colorPalette.50", _dark: "colorPalette.400/10" },
          },
          _expanded: {
            bg: { base: "colorPalette.50", _dark: "colorPalette.400/10" },
          },
        },
      },
      filled: {
        trigger: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: { base: "gray.100", _dark: "gray.800" },
        },
      },
    },

    size: {
      sm: {
        content: {
          p: "1",
          rounded: "sm",
          boxShadow: "md",
          minW: "12rem",
          fontSize: "sm",
        },
        trigger: {
          px: "3",
          h: "8",
          minW: "8",
          fontSize: "sm",
          rounded: "sm",
          gap: "1",
        },
        item: {
          py: "1",
          px: "2",
          rounded: "sm",
        },
        itemGroupLabel: {
          py: "1",
          px: "2",
        },
      },

      md: {
        content: {
          p: "1",
          rounded: "md",
          boxShadow: "sm",
          minW: "12rem",
          fontSize: "sm",
        },
        item: {
          py: "1.5",
          px: "2",
          rounded: "sm",
        },
        itemIndicator: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        itemGroupLabel: {
          py: "1.5",
          px: "2",
        },
        trigger: {
          px: "3",
          h: "10",
          minW: "10",
          fontSize: "sm",
          rounded: "md",
          gap: "2",
        },
      },

      lg: {
        content: {
          p: "2",
          rounded: "lg",
          fontSize: "md",
        },
        item: {
          py: "2",
          px: "3",
          rounded: "md",
        },
        itemGroupLabel: {
          py: "2",
          px: "3",
        },
        trigger: {
          fontSize: "md",
          px: "4",
          py: "3",
          rounded: "md",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
