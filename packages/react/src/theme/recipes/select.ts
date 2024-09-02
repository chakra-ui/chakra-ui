import { selectAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const selectSlotRecipe = defineSlotRecipe({
  className: "chakra-select",
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
      textAlign: "start",
      _placeholderShown: {
        color: "fg.subtle",
      },
      _disabled: {
        layerStyle: "disabled",
      },
      _invalid: {
        borderColor: "border.error",
      },
      focusVisibleRing: "outside",
    },
    indicator: {
      display: "flex",
      _icon: {
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
      boxShadow: "md",
      _open: {
        animationStyle: "slide-fade-in",
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
        bg: { base: "bg.subtle", _dark: "bg.emphasized" },
      },
      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
      _icon: {
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
            bg: "colorPalette.muted",
          },
          _expanded: {
            bg: "colorPalette.muted",
          },
        },
      },
      filled: {
        trigger: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.subtle",
        },
      },
    },

    size: {
      xs: {
        trigger: {
          px: "2",
          h: "6",
          minW: "6",
          textStyle: "xs",
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
        content: {
          p: "1",
          rounded: "sm",
          minW: "8rem",
          textStyle: "xs",
        },
      },

      sm: {
        content: {
          p: "1",
          rounded: "sm",
          minW: "12rem",
          textStyle: "sm",
        },
        trigger: {
          px: "3",
          h: "8",
          minW: "8",
          textStyle: "sm",
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
          minW: "12rem",
          textStyle: "sm",
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
          textStyle: "sm",
          rounded: "md",
          gap: "2",
        },
      },

      lg: {
        content: {
          p: "2",
          rounded: "lg",
          textStyle: "md",
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
          textStyle: "md",
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
